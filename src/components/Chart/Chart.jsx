import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Label,
  LabelList,
} from "recharts";
import './Chart.css';

const data = [
  { name: "משלוחים", value: 40, color: "#ef233c" },
  { name: "איסוף עצמי", value: 60, color: "#118ab2" },
  { name: "בהמתנה", value: 60, color: "#74c69d" },
];

// פונקציה לקביעת צבע טקסט לפי רקע
const getTextColor = (bgColor) => {
  const color = bgColor.substring(1);
  const rgb = parseInt(color, 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = rgb & 0xff;
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 150 ? "#000" : "#fff";
};

// תווית מותאמת אישית לכל נתח
const renderCustomLabel = (props) => {
  const { x, y, value, name, payload } = props;
  const fillColor = payload?.color ? getTextColor(payload.color) : "#000";

  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      dominantBaseline="central"
      fill={fillColor}
      fontSize={16}
      fontWeight="bold"
      direction="rtl"
      style={{
        textShadow: '0 1px 3px rgba(0,0,0,0.7)',
      }}
    >
      {`${name} - ${value}%`}
    </text>
  );
};

const Chart = ({ chartData = data }) => (
  <ResponsiveContainer width="100%" height={300} className="chart">
    <PieChart>
      <Pie
        data={chartData}
        cx="50%"
        cy="50%"
        innerRadius={50}
        outerRadius={90}
        dataKey="value"
        labelLine={false}
      >
        <Label
          value={`סה"כ מכירות`}
          position="center"
          fill="#333"
          fontSize={18}
          fontWeight="bold"
          direction="rtl"
        />
        <LabelList dataKey="value" content={renderCustomLabel} />
        {chartData.map((entry, index) => (
          <Cell key={index} fill={entry.color} />
        ))}
      </Pie>
      <Tooltip
        contentStyle={{
          fontSize: '14px',
          direction: 'rtl',
          textAlign: 'right',
        }}
      />
    </PieChart>
  </ResponsiveContainer>
);

export default Chart;
