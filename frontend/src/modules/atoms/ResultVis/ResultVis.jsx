import styled from "styled-components";
import React, { useCallback, useState } from "react";
import {
  PieChart,
  Pie,
  Sector,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

// 예시 데이터
// const data = [
//   { name: "Group A", value: 400 },
//   { name: "Group B", value: 300 },
//   { name: "Group C", value: 300 },
//   { name: "Group D", value: 200 },
// ];

// const exdata = [
//   {
//     subject: "Math",
//     A: 120,
//     B: 110,
//     fullMark: 150,
//   },
//   {
//     subject: "Chinese",
//     A: 98,
//     B: 130,
//     fullMark: 150,
//   },
//   {
//     subject: "English",
//     A: 86,
//     B: 130,
//     fullMark: 150,
//   },
//   {
//     subject: "Geography",
//     A: 99,
//     B: 100,
//     fullMark: 150,
//   },
//   {
//     subject: "Physics",
//     A: 85,
//     B: 90,
//     fullMark: 150,
//   },
//   {
//     subject: "History",
//     A: 65,
//     B: 85,
//     fullMark: 150,
//   },
// ];

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text
        x={cx}
        y={cy + 120}
        dy={8}
        textAnchor="middle"
        fill={fill}
        fontSize={15}
      >
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
        fontSize={12}
      >{`${payload.name} (${value})`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
        fontSize={12}
      >
        {`(Percent ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

export const ResultVis = ({ data, chartColor, radial, x, y, ...restProps }) => {
  // radial := functionality result visulaization 위한 boolean
  console.log(JSON.stringify(data));

  const parsed_data = Object.entries(data)
    .map(([k, v]) => ({
      name: k.split("_").slice(0, -1).join("_"),
      value: v,
    }))
    .slice(1);

  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  if (radial) {
    // data preprocessing
    const visdata = data.map((testcase) => {
      testcase.PF = testcase.is_pass ? 1 : 0;
      return testcase;
    });
    console.log(`radial ${JSON.stringify(visdata)}`);

    return (
      <BarChart
        width={600}
        height={300}
        data={visdata}
        margin={{
          top: 30,
          right: 50,
          left: 0,
          bottom: 20,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis type="number" domain={[0, 1]} tickCount={1} />
        <Tooltip />
        <Legend />
        <Bar dataKey="PF" fill={chartColor} />
      </BarChart>
    );
  } else {
    return (
      <PieChart width={600} height={300}>
        <Pie
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          data={parsed_data}
          cx={300}
          cy={140}
          innerRadius={40}
          outerRadius={80}
          fill={chartColor}
          dataKey="value"
          onMouseEnter={onPieEnter}
        />
      </PieChart>
    );
  }
};
