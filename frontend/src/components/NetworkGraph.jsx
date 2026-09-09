import { useMemo } from "react";

const typeColor = {
  person: "#3b82f6",
  phone: "#22d3ee",
  vehicle: "#f59e0b",
  case: "#22c55e",
  location: "#a855f7",
  organization: "#ec4899",
};

export default function NetworkGraph({
  nodes = [],
  edges = [],
  selectedId,
  onSelect,
}) {
  // Give API nodes positions automatically.
  const positionedNodes = useMemo(() => {
    const centerX = 350;
    const centerY = 200;
    const radius = Math.min(140, 35 * Math.max(nodes.length, 2));

    return nodes.map((node, index) => {
      if (nodes.length === 1) {
        return {
          ...node,
          x: centerX,
          y: centerY,
        };
      }

      const angle = (2 * Math.PI * index) / nodes.length;

      return {
        ...node,
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle),
      };
    });
  }, [nodes]);

  const nodeMap = useMemo(() => {
    return new Map(positionedNodes.map((node) => [String(node.id), node]));
  }, [positionedNodes]);

  return (
    <div className="bg-[#111a2e] border border-slate-800 rounded-lg p-5 flex-1 flex flex-col min-w-0 min-h-0">
      <div className="mb-3 shrink-0">
        <p className="text-white font-semibold text-sm">
          Network Graph
        </p>

        <p className="text-slate-500 text-xs mt-0.5">
          Investigation network · {nodes.length} entities · {edges.length} relationships
        </p>
      </div>

      <div className="flex-1 rounded-md bg-[#0B1220] min-h-0">
        {nodes.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <p className="text-slate-500 text-sm">
              No network data available.
            </p>
          </div>
        ) : (
          <svg
            viewBox="0 0 700 400"
            className="w-full h-full"
          >
            {/* Relationships */}
            {edges.map((edge, index) => {
              const sourceId = edge.source ?? edge.source_entity_id;
              const targetId = edge.target ?? edge.target_entity_id;

              const source = nodeMap.get(String(sourceId));
              const target = nodeMap.get(String(targetId));

              if (!source || !target) return null;

              return (
                <g key={edge.id ?? index}>
                  <line
                    x1={source.x}
                    y1={source.y}
                    x2={target.x}
                    y2={target.y}
                    stroke="rgba(148,163,184,0.35)"
                    strokeWidth="2"
                  />

                  {/* Relationship confidence */}
                  {edge.confidence !== undefined && (
                    <text
                      x={(source.x + target.x) / 2}
                      y={(source.y + target.y) / 2 - 5}
                      textAnchor="middle"
                      fill="#64748b"
                      fontSize="9"
                    >
                      {edge.confidence}%
                    </text>
                  )}
                </g>
              );
            })}

            {/* Entities */}
            {positionedNodes.map((node) => {
              const isSelected =
                String(selectedId) === String(node.id);

              const color =
                typeColor[node.type || node.entity_type] ||
                "#64748b";

              return (
                <g
                  key={node.id}
                  className="cursor-pointer"
                  onClick={() => onSelect(node)}
                >
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={isSelected ? 27 : 22}
                    fill={color}
                    opacity={isSelected ? 1 : 0.85}
                    stroke={isSelected ? "#fff" : "none"}
                    strokeWidth="2"
                  />

                  <text
                    x={node.x}
                    y={node.y + 40}
                    textAnchor="middle"
                    fill="#e2e8f0"
                    fontSize="12"
                    fontWeight="600"
                  >
                    {node.label || node.name}
                  </text>

                  <text
                    x={node.x}
                    y={node.y + 54}
                    textAnchor="middle"
                    fill="#64748b"
                    fontSize="10"
                  >
                    {node.sub || node.type || node.entity_type}
                  </text>
                </g>
              );
            })}
          </svg>
        )}
      </div>
    </div>
  );
}

export { typeColor };