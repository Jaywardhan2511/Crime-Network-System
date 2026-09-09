from datetime import datetime
from pathlib import Path
import csv
import io
import json

from fastapi import FastAPI, Depends, HTTPException, UploadFile, File, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from sqlalchemy import (
    create_engine, Column, Integer, String, Text, DateTime,
    ForeignKey, Float, or_
)
from sqlalchemy.orm import declarative_base, sessionmaker, Session

# ============================================================
# CNAS Backend MVP
# FastAPI + SQLAlchemy + SQLite
# ============================================================

BASE_DIR = Path(__file__).resolve().parent
DATABASE_URL = f"sqlite:///{BASE_DIR / 'database.db'}"

engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(bind=engine, autocommit=False, autoflush=False)
Base = declarative_base()

app = FastAPI(
    title="Criminal Network Analysis System API",
    description="Backend API for AI-assisted criminal network investigation.",
    version="1.0.0",
)

# Allow the React/Vite frontend to call the API during development.
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# -----------------------------
# Database models
# -----------------------------

class Entity(Base):
    __tablename__ = "entities"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(200), nullable=False, index=True)
    entity_type = Column(String(50), nullable=False, index=True)
    description = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)


class Case(Base):
    __tablename__ = "cases"

    id = Column(Integer, primary_key=True, index=True)
    case_number = Column(String(100), unique=True, nullable=False, index=True)
    title = Column(String(200), nullable=False)
    description = Column(Text, nullable=True)
    status = Column(String(50), default="Open", index=True)
    created_at = Column(DateTime, default=datetime.utcnow)


class Relationship(Base):
    __tablename__ = "relationships"

    id = Column(Integer, primary_key=True, index=True)
    source_entity_id = Column(Integer, ForeignKey("entities.id"), nullable=False, index=True)
    target_entity_id = Column(Integer, ForeignKey("entities.id"), nullable=False, index=True)
    relationship_type = Column(String(100), nullable=False, index=True)
    confidence = Column(Float, nullable=True)
    description = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)


class Evidence(Base):
    __tablename__ = "evidence"

    id = Column(Integer, primary_key=True, index=True)
    relationship_id = Column(Integer, ForeignKey("relationships.id"), nullable=True, index=True)
    case_id = Column(Integer, ForeignKey("cases.id"), nullable=True, index=True)
    source_type = Column(String(100), nullable=False)
    source_reference = Column(String(200), nullable=False)
    description = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)


class Alert(Base):
    __tablename__ = "alerts"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(250), nullable=False)
    severity = Column(String(50), default="medium", index=True)
    confidence = Column(Float, nullable=True)
    description = Column(Text, nullable=True)
    status = Column(String(50), default="new", index=True)
    entity_id = Column(Integer, ForeignKey("entities.id"), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)


class Report(Base):
    __tablename__ = "reports"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(250), nullable=False)
    case_id = Column(Integer, ForeignKey("cases.id"), nullable=True)
    status = Column(String(50), default="Draft")
    summary = Column(Text, nullable=True)
    findings = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)


class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(Integer, primary_key=True, index=True)
    action = Column(String(100), nullable=False)
    resource_type = Column(String(100), nullable=True)
    resource_id = Column(String(100), nullable=True)
    details = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)


Base.metadata.create_all(bind=engine)


# -----------------------------
# Request schemas
# -----------------------------

class EntityCreate(BaseModel):
    name: str = Field(min_length=1, max_length=200)
    entity_type: str = Field(min_length=1, max_length=50)
    description: str | None = None


class CaseCreate(BaseModel):
    case_number: str = Field(min_length=1, max_length=100)
    title: str = Field(min_length=1, max_length=200)
    description: str | None = None
    status: str = "Open"


class RelationshipCreate(BaseModel):
    source_entity_id: int
    target_entity_id: int
    relationship_type: str = Field(min_length=1, max_length=100)
    confidence: float | None = Field(default=None, ge=0, le=100)
    description: str | None = None


class EvidenceCreate(BaseModel):
    relationship_id: int | None = None
    case_id: int | None = None
    source_type: str
    source_reference: str
    description: str | None = None


class AlertCreate(BaseModel):
    title: str
    severity: str = "medium"
    confidence: float | None = Field(default=None, ge=0, le=100)
    description: str | None = None
    entity_id: int | None = None


class ReportCreate(BaseModel):
    title: str
    case_id: int | None = None
    status: str = "Draft"
    summary: str | None = None
    findings: str | None = None


# -----------------------------
# Helpers
# -----------------------------

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def log_action(
    db: Session,
    action: str,
    resource_type: str | None = None,
    resource_id: str | None = None,
    details: str | None = None,
):
    db.add(AuditLog(
        action=action,
        resource_type=resource_type,
        resource_id=resource_id,
        details=details,
    ))
    db.commit()


def entity_dict(e: Entity):
    return {
        "id": e.id,
        "name": e.name,
        "type": e.entity_type,
        "description": e.description,
        "created_at": e.created_at,
    }


def case_dict(c: Case):
    return {
        "id": c.id,
        "case_number": c.case_number,
        "title": c.title,
        "description": c.description,
        "status": c.status,
        "created_at": c.created_at,
    }


def relationship_dict(r: Relationship):
    return {
        "id": r.id,
        "source_entity_id": r.source_entity_id,
        "target_entity_id": r.target_entity_id,
        "relationship_type": r.relationship_type,
        "confidence": r.confidence,
        "description": r.description,
        "created_at": r.created_at,
    }


# -----------------------------
# System
# -----------------------------

@app.get("/")
def root():
    return {
        "message": "Criminal Network Analysis System API",
        "status": "running",
        "version": "1.0.0",
    }


@app.get("/health")
def health():
    return {"status": "healthy"}


# -----------------------------
# Entities
# -----------------------------

@app.get("/entities")
def get_entities(
    entity_type: str | None = None,
    db: Session = Depends(get_db)
):
    query = db.query(Entity)
    if entity_type:
        query = query.filter(Entity.entity_type == entity_type)
    return {"entities": [entity_dict(e) for e in query.all()]}


@app.post("/entities")
def create_entity(data: EntityCreate, db: Session = Depends(get_db)):
    entity = Entity(
        name=data.name,
        entity_type=data.entity_type.lower(),
        description=data.description,
    )
    db.add(entity)
    db.commit()
    db.refresh(entity)
    log_action(db, "CREATE", "entity", str(entity.id), entity.name)
    return entity_dict(entity)


@app.get("/entities/{entity_id}")
def get_entity(entity_id: int, db: Session = Depends(get_db)):
    entity = db.get(Entity, entity_id)
    if not entity:
        raise HTTPException(404, "Entity not found")

    relationships = db.query(Relationship).filter(
        or_(
            Relationship.source_entity_id == entity_id,
            Relationship.target_entity_id == entity_id
        )
    ).all()

    case_ids = {
        e.case_id for e in db.query(Evidence).filter(
            Evidence.relationship_id.in_([r.id for r in relationships])
        ).all()
        if e.case_id is not None
    }

    return {
        **entity_dict(entity),
        "statistics": {
            "connections": len(relationships),
            "cases": len(case_ids),
        },
        "connections": [relationship_dict(r) for r in relationships],
        "cases": [case_dict(db.get(Case, cid)) for cid in case_ids if db.get(Case, cid)],
    }


@app.get("/entities/{entity_id}/connections")
def get_entity_connections(entity_id: int, db: Session = Depends(get_db)):
    if not db.get(Entity, entity_id):
        raise HTTPException(404, "Entity not found")

    relationships = db.query(Relationship).filter(
        or_(
            Relationship.source_entity_id == entity_id,
            Relationship.target_entity_id == entity_id
        )
    ).all()

    results = []
    for r in relationships:
        other_id = (
            r.target_entity_id
            if r.source_entity_id == entity_id
            else r.source_entity_id
        )
        other = db.get(Entity, other_id)
        results.append({
            "relationship": relationship_dict(r),
            "connected_entity": entity_dict(other) if other else None,
        })

    return {"connections": results}


# -----------------------------
# Cases
# -----------------------------

@app.get("/cases")
def get_cases(db: Session = Depends(get_db)):
    return {"cases": [case_dict(c) for c in db.query(Case).all()]}


@app.post("/cases")
def create_case(data: CaseCreate, db: Session = Depends(get_db)):
    if db.query(Case).filter(Case.case_number == data.case_number).first():
        raise HTTPException(409, "Case number already exists")

    case = Case(
        case_number=data.case_number,
        title=data.title,
        description=data.description,
        status=data.status,
    )
    db.add(case)
    db.commit()
    db.refresh(case)
    log_action(db, "CREATE", "case", str(case.id), case.case_number)
    return case_dict(case)


@app.get("/cases/{case_id}")
def get_case(case_id: int, db: Session = Depends(get_db)):
    case = db.get(Case, case_id)
    if not case:
        raise HTTPException(404, "Case not found")

    evidence = db.query(Evidence).filter(Evidence.case_id == case_id).all()
    return {
        **case_dict(case),
        "evidence": [
            {
                "id": e.id,
                "relationship_id": e.relationship_id,
                "source_type": e.source_type,
                "source_reference": e.source_reference,
                "description": e.description,
            }
            for e in evidence
        ],
    }


# -----------------------------
# Relationships
# -----------------------------

@app.get("/relationships")
def get_relationships(db: Session = Depends(get_db)):
    return {"relationships": [relationship_dict(r) for r in db.query(Relationship).all()]}


@app.post("/relationships")
def create_relationship(data: RelationshipCreate, db: Session = Depends(get_db)):
    source = db.get(Entity, data.source_entity_id)
    target = db.get(Entity, data.target_entity_id)

    if not source or not target:
        raise HTTPException(404, "Source or target entity does not exist")

    if source.id == target.id:
        raise HTTPException(400, "An entity cannot be related to itself")

    relationship = Relationship(
        source_entity_id=source.id,
        target_entity_id=target.id,
        relationship_type=data.relationship_type,
        confidence=data.confidence,
        description=data.description,
    )
    db.add(relationship)
    db.commit()
    db.refresh(relationship)
    log_action(db, "CREATE", "relationship", str(relationship.id), data.relationship_type)
    return relationship_dict(relationship)


@app.get("/relationships/{relationship_id}")
def get_relationship(relationship_id: int, db: Session = Depends(get_db)):
    r = db.get(Relationship, relationship_id)
    if not r:
        raise HTTPException(404, "Relationship not found")

    source = db.get(Entity, r.source_entity_id)
    target = db.get(Entity, r.target_entity_id)
    evidence = db.query(Evidence).filter(Evidence.relationship_id == r.id).all()

    return {
        **relationship_dict(r),
        "source_entity": entity_dict(source) if source else None,
        "target_entity": entity_dict(target) if target else None,
        "evidence": [
            {
                "id": e.id,
                "case_id": e.case_id,
                "source_type": e.source_type,
                "source_reference": e.source_reference,
                "description": e.description,
            }
            for e in evidence
        ],
    }


# -----------------------------
# Evidence
# -----------------------------

@app.post("/evidence")
def create_evidence(data: EvidenceCreate, db: Session = Depends(get_db)):
    if data.relationship_id and not db.get(Relationship, data.relationship_id):
        raise HTTPException(404, "Relationship not found")
    if data.case_id and not db.get(Case, data.case_id):
        raise HTTPException(404, "Case not found")

    evidence = Evidence(
        relationship_id=data.relationship_id,
        case_id=data.case_id,
        source_type=data.source_type,
        source_reference=data.source_reference,
        description=data.description,
    )
    db.add(evidence)
    db.commit()
    db.refresh(evidence)
    log_action(db, "CREATE", "evidence", str(evidence.id), data.source_reference)
    return {
        "id": evidence.id,
        "relationship_id": evidence.relationship_id,
        "case_id": evidence.case_id,
        "source_type": evidence.source_type,
        "source_reference": evidence.source_reference,
        "description": evidence.description,
    }


# -----------------------------
# Search
# -----------------------------

@app.get("/search")
def search(
    q: str = Query(min_length=1),
    entity_type: str | None = None,
    db: Session = Depends(get_db),
):
    query = db.query(Entity).filter(
        or_(
            Entity.name.ilike(f"%{q}%"),
            Entity.description.ilike(f"%{q}%"),
        )
    )
    if entity_type:
        query = query.filter(Entity.entity_type == entity_type)

    entities = query.all()

    cases = db.query(Case).filter(
        or_(
            Case.case_number.ilike(f"%{q}%"),
            Case.title.ilike(f"%{q}%"),
            Case.description.ilike(f"%{q}%"),
        )
    ).all()

    return {
        "query": q,
        "entities": [entity_dict(e) for e in entities],
        "cases": [case_dict(c) for c in cases],
        "total": len(entities) + len(cases),
    }


# -----------------------------
# Network
# -----------------------------

@app.get("/network/{entity_id}")
def get_network(
    entity_id: int,
    depth: int = Query(default=1, ge=1, le=3),
    db: Session = Depends(get_db),
):
    if not db.get(Entity, entity_id):
        raise HTTPException(404, "Entity not found")

    visited = {entity_id}
    frontier = {entity_id}
    selected_relationships = []

    for _ in range(depth):
        if not frontier:
            break

        relationships = db.query(Relationship).filter(
            or_(
                Relationship.source_entity_id.in_(frontier),
                Relationship.target_entity_id.in_(frontier)
            )
        ).all()

        next_frontier = set()

        for r in relationships:
            if r.id not in {x.id for x in selected_relationships}:
                selected_relationships.append(r)

            other = (
                r.target_entity_id
                if r.source_entity_id in frontier
                else r.source_entity_id
            )

            if other not in visited:
                next_frontier.add(other)

        visited.update(next_frontier)
        frontier = next_frontier

    nodes = []
    for eid in visited:
        e = db.get(Entity, eid)
        if e:
            nodes.append({
                "id": str(e.id),
                "label": e.name,
                "type": e.entity_type,
            })

    edges = [
        {
            "id": str(r.id),
            "source": str(r.source_entity_id),
            "target": str(r.target_entity_id),
            "type": r.relationship_type,
            "confidence": r.confidence,
        }
        for r in selected_relationships
    ]

    return {
        "center_entity_id": entity_id,
        "depth": depth,
        "nodes": nodes,
        "edges": edges,
    }


# -----------------------------
# Dashboard
# -----------------------------

@app.get("/dashboard/overview")
def dashboard_overview(db: Session = Depends(get_db)):
    entities = db.query(Entity).count()
    cases = db.query(Case).count()
    relationships = db.query(Relationship).count()
    alerts = db.query(Alert).filter(Alert.status == "new").count()

    # Simple bridge approximation for MVP:
    # entities with at least two relationships.
    bridge_candidates = 0
    for e in db.query(Entity).all():
        count = db.query(Relationship).filter(
            or_(
                Relationship.source_entity_id == e.id,
                Relationship.target_entity_id == e.id
            )
        ).count()
        if count >= 2:
            bridge_candidates += 1

    return {
        "stats": {
            "entities": entities,
            "connected_cases": cases,
            "network_bridges": bridge_candidates,
            "priority_leads": alerts,
            "relationships": relationships,
        },
        "recent_alerts": [
            {
                "id": a.id,
                "title": a.title,
                "severity": a.severity,
                "confidence": a.confidence,
                "description": a.description,
                "status": a.status,
                "created_at": a.created_at,
            }
            for a in db.query(Alert).order_by(Alert.created_at.desc()).limit(5).all()
        ],
    }


# -----------------------------
# Alerts
# -----------------------------

@app.get("/alerts")
def get_alerts(
    status: str | None = None,
    db: Session = Depends(get_db)
):
    query = db.query(Alert)
    if status:
        query = query.filter(Alert.status == status)

    return {
        "alerts": [
            {
                "id": a.id,
                "title": a.title,
                "severity": a.severity,
                "confidence": a.confidence,
                "description": a.description,
                "status": a.status,
                "entity_id": a.entity_id,
                "created_at": a.created_at,
            }
            for a in query.order_by(Alert.created_at.desc()).all()
        ]
    }


@app.post("/alerts")
def create_alert(data: AlertCreate, db: Session = Depends(get_db)):
    if data.entity_id and not db.get(Entity, data.entity_id):
        raise HTTPException(404, "Entity not found")

    alert = Alert(
        title=data.title,
        severity=data.severity,
        confidence=data.confidence,
        description=data.description,
        entity_id=data.entity_id,
    )
    db.add(alert)
    db.commit()
    db.refresh(alert)
    return {
        "id": alert.id,
        "title": alert.title,
        "severity": alert.severity,
        "confidence": alert.confidence,
        "description": alert.description,
        "status": alert.status,
        "entity_id": alert.entity_id,
    }


# -----------------------------
# Reports
# -----------------------------

@app.get("/reports")
def get_reports(db: Session = Depends(get_db)):
    return {
        "reports": [
            {
                "id": r.id,
                "title": r.title,
                "case_id": r.case_id,
                "status": r.status,
                "summary": r.summary,
                "findings": r.findings,
                "created_at": r.created_at,
            }
            for r in db.query(Report).order_by(Report.created_at.desc()).all()
        ]
    }


@app.post("/reports")
def create_report(data: ReportCreate, db: Session = Depends(get_db)):
    if data.case_id and not db.get(Case, data.case_id):
        raise HTTPException(404, "Case not found")

    report = Report(
        title=data.title,
        case_id=data.case_id,
        status=data.status,
        summary=data.summary,
        findings=data.findings,
    )
    db.add(report)
    db.commit()
    db.refresh(report)
    log_action(db, "CREATE", "report", str(report.id), report.title)

    return {
        "id": report.id,
        "title": report.title,
        "case_id": report.case_id,
        "status": report.status,
        "summary": report.summary,
        "findings": report.findings,
    }


# -----------------------------
# Upload / ingestion
# -----------------------------

@app.post("/upload")
async def upload_file(file: UploadFile = File(...), db: Session = Depends(get_db)):
    import csv
    import io
    import json

    content = await file.read()
    filename = file.filename.lower()

    try:
        # -------------------------
        # Read uploaded data
        # -------------------------
        if filename.endswith(".csv"):
            text = content.decode("utf-8-sig")
            rows = list(csv.DictReader(io.StringIO(text)))

        elif filename.endswith(".json"):
            rows = json.loads(content.decode("utf-8"))
            if isinstance(rows, dict):
                rows = rows.get("data", [])

        else:
            raise HTTPException(
                status_code=400,
                detail="Only CSV and JSON files are supported."
            )

        if not rows:
            raise HTTPException(
                status_code=400,
                detail="Uploaded file contains no data."
            )

        entities_created = 0
        relationships_created = 0

        # -------------------------
        # Helper: find/create entity
        # -------------------------
        def get_or_create_entity(name, entity_type, description=""):
            nonlocal entities_created

            name = str(name).strip()
            entity_type = str(entity_type or "unknown").strip().lower()

            entity = (
                db.query(Entity)
                .filter(Entity.name == name)
                .first()
            )

            if entity:
                return entity

            entity = Entity(
                name=name,
                entity_type=entity_type,
                description=description or ""
            )

            db.add(entity)
            db.flush()

            entities_created += 1
            return entity

        # -------------------------
        # Detect network CSV
        # -------------------------
        first_row = rows[0]
        columns = set(first_row.keys())

        network_format = (
            "source_name" in columns
            and "target_name" in columns
        )

        # =====================================================
        # NETWORK FORMAT
        # source_name,target_name,...
        # =====================================================
        if network_format:

            for row in rows:

                source_name = row.get("source_name")
                target_name = row.get("target_name")

                if not source_name or not target_name:
                    continue

                source = get_or_create_entity(
                    source_name,
                    row.get("source_type", "unknown"),
                    row.get("source_description", "")
                )

                target = get_or_create_entity(
                    target_name,
                    row.get("target_type", "unknown"),
                    row.get("target_description", "")
                )

                relationship_type = (
                    row.get("relationship_type")
                    or "ASSOCIATED_WITH"
                )

                confidence_value = row.get("confidence")

                try:
                    confidence = (
                        float(confidence_value)
                        if confidence_value not in (None, "")
                        else None
                    )
                except ValueError:
                    confidence = None

                # Avoid duplicate relationships
                existing = (
                    db.query(Relationship)
                    .filter(
                        Relationship.source_entity_id == source.id,
                        Relationship.target_entity_id == target.id,
                        Relationship.relationship_type == relationship_type
                    )
                    .first()
                )

                if not existing:
                    relationship = Relationship(
                        source_entity_id=source.id,
                        target_entity_id=target.id,
                        relationship_type=relationship_type,
                        confidence=confidence,
                        description=row.get("description", "")
                    )

                    db.add(relationship)
                    relationships_created += 1

        # =====================================================
        # NORMAL ENTITY CSV
        # name,entity_type,description
        # =====================================================
        else:

            for row in rows:

                name = row.get("name")

                if not name:
                    continue

                get_or_create_entity(
                    name,
                    row.get("entity_type") or row.get("type") or "unknown",
                    row.get("description", "")
                )

        db.commit()

        return {
            "message": "Upload processed successfully",
            "filename": file.filename,
            "entities_created": entities_created,
            "relationships_created": relationships_created
        }

    except HTTPException:
        raise

    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail=f"Upload processing failed: {str(e)}"
        )


# -----------------------------
# AI integration contract
# -----------------------------

@app.get("/ai/network-input/{entity_id}")
def get_ai_network_input(
    entity_id: int,
    depth: int = Query(default=2, ge=1, le=3),
    db: Session = Depends(get_db),
):
    """
    Gives the AI teammate a clean, stable JSON payload.
    The AI service can consume this endpoint without knowing
    anything about SQLAlchemy or SQLite.
    """
    network = get_network(entity_id, depth, db)

    return {
        "entity": entity_id,
        "depth": depth,
        "nodes": network["nodes"],
        "relationships": network["edges"],
        "task_context": {
            "purpose": "AI-assisted network analysis",
            "interpretation": "Find patterns and investigative leads; do not determine guilt.",
        },
    }


@app.post("/ai/findings")
def receive_ai_finding(payload: dict, db: Session = Depends(get_db)):
    """
    Temporary integration endpoint for the AI teammate.
    Later this can be replaced with a stricter Pydantic schema.
    """
    title = payload.get("title", "AI-detected pattern")
    severity = payload.get("severity", "medium")
    confidence = payload.get("confidence")
    description = payload.get("description", "")
    entity_id = payload.get("entity_id")

    if entity_id and not db.get(Entity, entity_id):
        raise HTTPException(404, "Entity not found")

    alert = Alert(
        title=title,
        severity=severity,
        confidence=confidence,
        description=description,
        entity_id=entity_id,
    )
    db.add(alert)
    db.commit()
    db.refresh(alert)

    return {
        "status": "accepted",
        "alert_id": alert.id,
    }
