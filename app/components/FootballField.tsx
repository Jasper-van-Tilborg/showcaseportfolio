'use client';

export default function FootballField() {
  // Voetbalveld afmetingen - professionele verhoudingen
  const fieldWidth = 1200;
  const fieldHeight = 800;
  const lineWidth = 2.5;
  
  // Padding voor buitenlijnen
  const padding = 80;
  const centerX = fieldWidth / 2;
  const centerY = fieldHeight / 2;
  const fieldInnerWidth = fieldWidth - (padding * 2);
  const fieldInnerHeight = fieldHeight - (padding * 2);
  
  // Proporties gebaseerd op standaard veld (105m x 68m)
  // Doelgebied: 5.5m x 18.32m
  const goalBoxDepth = fieldInnerWidth * 0.052; // ~5.5% van veldbreedte
  const goalBoxWidth = fieldInnerHeight * 0.27; // ~27% van veldhoogte
  
  // Strafschopgebied: 16.5m x 40.32m
  const penaltyBoxDepth = fieldInnerWidth * 0.157; // ~16% van veldbreedte
  const penaltyBoxWidth = fieldInnerHeight * 0.593; // ~59% van veldhoogte
  
  // Strafschopboog: straal 9.15m (vanaf de goal lijn)
  const penaltyArcRadius = fieldInnerWidth * 0.087;
  
  // Middencirkel: straal 9.15m
  const centerCircleRadius = fieldInnerWidth * 0.087;
  
  // Penalty spot positie (11m vanaf goal lijn)
  const penaltySpotDistance = fieldInnerWidth * 0.105;
  const leftPenaltySpotX = padding + penaltySpotDistance;
  const rightPenaltySpotX = fieldWidth - padding - penaltySpotDistance;
  
  // Strafschopboog berekeningen - alleen het deel buiten de penalty box
  // Afstand van penalty spot tot penalty box lijn
  const distanceFromSpotToBoxLine = penaltyBoxDepth - penaltySpotDistance;
  // Hoogte van de boog waar deze de penalty box lijn raakt
  const arcHeightAtBoxLine = Math.sqrt(Math.pow(penaltyArcRadius, 2) - Math.pow(distanceFromSpotToBoxLine, 2));
  // Y-coördinaten waar de boog de penalty box lijn raakt
  const leftArcTopY = centerY - arcHeightAtBoxLine;
  const leftArcBottomY = centerY + arcHeightAtBoxLine;
  const rightArcTopY = centerY - arcHeightAtBoxLine;
  const rightArcBottomY = centerY + arcHeightAtBoxLine;
  
  return (
    <svg
      className="football-field"
      viewBox={`0 0 ${fieldWidth} ${fieldHeight}`}
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
      }}
    >
      {/* Buitenlijnen veld */}
      <rect
        x={padding}
        y={padding}
        width={fieldInnerWidth}
        height={fieldInnerHeight}
        fill="none"
        strokeWidth={lineWidth}
        className="field-outline"
      />
      
      {/* Middenlijn */}
      <line
        x1={fieldWidth / 2}
        y1={padding}
        x2={fieldWidth / 2}
        y2={fieldHeight - padding}
        strokeWidth={lineWidth}
        className="field-line"
      />
      
      {/* Midden cirkel */}
      <circle
        cx={fieldWidth / 2}
        cy={centerY}
        r={centerCircleRadius}
        fill="none"
        strokeWidth={lineWidth}
        className="field-line"
      />
      
      {/* Midden stip */}
      <circle
        cx={fieldWidth / 2}
        cy={centerY}
        r="3"
        className="field-dot"
      />
      
      {/* === LINKER KANT === */}
      
      {/* Linker doelgebied (goal box) - alleen de zijkant */}
      <line
        x1={padding + goalBoxDepth}
        y1={centerY - (goalBoxWidth / 2)}
        x2={padding + goalBoxDepth}
        y2={centerY + (goalBoxWidth / 2)}
        strokeWidth={lineWidth}
        className="field-line"
      />
      {/* Bovenkant goal box */}
      <line
        x1={padding}
        y1={centerY - (goalBoxWidth / 2)}
        x2={padding + goalBoxDepth}
        y2={centerY - (goalBoxWidth / 2)}
        strokeWidth={lineWidth}
        className="field-line"
      />
      {/* Onderkant goal box */}
      <line
        x1={padding}
        y1={centerY + (goalBoxWidth / 2)}
        x2={padding + goalBoxDepth}
        y2={centerY + (goalBoxWidth / 2)}
        strokeWidth={lineWidth}
        className="field-line"
      />
      
      {/* Linker strafschopgebied (penalty box) - zijkant + horizontale delen buiten goal box */}
      <line
        x1={padding + penaltyBoxDepth}
        y1={centerY - (penaltyBoxWidth / 2)}
        x2={padding + penaltyBoxDepth}
        y2={centerY + (penaltyBoxWidth / 2)}
        strokeWidth={lineWidth}
        className="field-line"
      />
      {/* Bovenkant penalty box links van goal box */}
      <line
        x1={padding}
        y1={centerY - (penaltyBoxWidth / 2)}
        x2={padding + goalBoxDepth}
        y2={centerY - (penaltyBoxWidth / 2)}
        strokeWidth={lineWidth}
        className="field-line"
      />
      {/* Bovenkant penalty box rechts van goal box */}
      <line
        x1={padding + goalBoxDepth}
        y1={centerY - (penaltyBoxWidth / 2)}
        x2={padding + penaltyBoxDepth}
        y2={centerY - (penaltyBoxWidth / 2)}
        strokeWidth={lineWidth}
        className="field-line"
      />
      {/* Onderkant penalty box links van goal box */}
      <line
        x1={padding}
        y1={centerY + (penaltyBoxWidth / 2)}
        x2={padding + goalBoxDepth}
        y2={centerY + (penaltyBoxWidth / 2)}
        strokeWidth={lineWidth}
        className="field-line"
      />
      {/* Onderkant penalty box rechts van goal box */}
      <line
        x1={padding + goalBoxDepth}
        y1={centerY + (penaltyBoxWidth / 2)}
        x2={padding + penaltyBoxDepth}
        y2={centerY + (penaltyBoxWidth / 2)}
        strokeWidth={lineWidth}
        className="field-line"
      />
      
      {/* Linker strafschop stip (11m vanaf goal lijn) */}
      <circle
        cx={leftPenaltySpotX}
        cy={centerY}
        r="3"
        className="field-dot"
      />
      
      {/* Linker strafschopboog - halve cirkel vanuit penalty spot, maar alleen het deel buiten de penalty box */}
      <path
        d={`M ${padding + penaltyBoxDepth} ${leftArcTopY} 
            A ${penaltyArcRadius} ${penaltyArcRadius} 0 0,1 
            ${padding + penaltyBoxDepth} ${leftArcBottomY}`}
        fill="none"
        strokeWidth={lineWidth}
        className="field-line"
      />
      
      {/* === RECHTER KANT === */}
      
      {/* Rechter doelgebied (goal box) - alleen de zijkant */}
      <line
        x1={fieldWidth - padding - goalBoxDepth}
        y1={centerY - (goalBoxWidth / 2)}
        x2={fieldWidth - padding - goalBoxDepth}
        y2={centerY + (goalBoxWidth / 2)}
        strokeWidth={lineWidth}
        className="field-line"
      />
      {/* Bovenkant goal box */}
      <line
        x1={fieldWidth - padding - goalBoxDepth}
        y1={centerY - (goalBoxWidth / 2)}
        x2={fieldWidth - padding}
        y2={centerY - (goalBoxWidth / 2)}
        strokeWidth={lineWidth}
        className="field-line"
      />
      {/* Onderkant goal box */}
      <line
        x1={fieldWidth - padding - goalBoxDepth}
        y1={centerY + (goalBoxWidth / 2)}
        x2={fieldWidth - padding}
        y2={centerY + (goalBoxWidth / 2)}
        strokeWidth={lineWidth}
        className="field-line"
      />
      
      {/* Rechter strafschopgebied (penalty box) - zijkant + horizontale delen buiten goal box */}
      <line
        x1={fieldWidth - padding - penaltyBoxDepth}
        y1={centerY - (penaltyBoxWidth / 2)}
        x2={fieldWidth - padding - penaltyBoxDepth}
        y2={centerY + (penaltyBoxWidth / 2)}
        strokeWidth={lineWidth}
        className="field-line"
      />
      {/* Bovenkant penalty box links van goal box */}
      <line
        x1={fieldWidth - padding - penaltyBoxDepth}
        y1={centerY - (penaltyBoxWidth / 2)}
        x2={fieldWidth - padding - goalBoxDepth}
        y2={centerY - (penaltyBoxWidth / 2)}
        strokeWidth={lineWidth}
        className="field-line"
      />
      {/* Bovenkant penalty box rechts van goal box */}
      <line
        x1={fieldWidth - padding - goalBoxDepth}
        y1={centerY - (penaltyBoxWidth / 2)}
        x2={fieldWidth - padding}
        y2={centerY - (penaltyBoxWidth / 2)}
        strokeWidth={lineWidth}
        className="field-line"
      />
      {/* Onderkant penalty box links van goal box */}
      <line
        x1={fieldWidth - padding - penaltyBoxDepth}
        y1={centerY + (penaltyBoxWidth / 2)}
        x2={fieldWidth - padding - goalBoxDepth}
        y2={centerY + (penaltyBoxWidth / 2)}
        strokeWidth={lineWidth}
        className="field-line"
      />
      {/* Onderkant penalty box rechts van goal box */}
      <line
        x1={fieldWidth - padding - goalBoxDepth}
        y1={centerY + (penaltyBoxWidth / 2)}
        x2={fieldWidth - padding}
        y2={centerY + (penaltyBoxWidth / 2)}
        strokeWidth={lineWidth}
        className="field-line"
      />
      
      {/* Rechter strafschop stip (11m vanaf goal lijn) */}
      <circle
        cx={rightPenaltySpotX}
        cy={centerY}
        r="3"
        className="field-dot"
      />
      
      {/* Rechter strafschopboog - halve cirkel vanuit penalty spot, maar alleen het deel buiten de penalty box */}
      <path
        d={`M ${fieldWidth - padding - penaltyBoxDepth} ${rightArcTopY} 
            A ${penaltyArcRadius} ${penaltyArcRadius} 0 0,0 
            ${fieldWidth - padding - penaltyBoxDepth} ${rightArcBottomY}`}
        fill="none"
        strokeWidth={lineWidth}
        className="field-line"
      />
    </svg>
  );
}

