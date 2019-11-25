import React from "react";
import {
  G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  View,
  Guide,
  Shape,
  Facet,
  Util
} from "bizcharts";
import DataSet from "@antv/data-set";

export default  class Donut extends React.Component {
  render() {
    const { DataView } = DataSet;
    const { Html } = Guide;
    const data = [
      {
        item: "关键词一",
        count: 40
      },
      {
        item: "关键词二",
        count: 21
      },
      {
        item: "关键词三",
        count: 17
      },
      {
        item: "关键词四",
        count: 13
      },
      {
        item: "关键词五",
        count: 9
      }
    ];
    const dv = new DataView();
    dv.source(data).transform({
      type: "percent",
      field: "count",
      dimension: "item",
      as: "percent"
    });
    const cols = {
      percent: {
        formatter: val => {
          val = val * 100 + "%";
          return val;
        }
      }
    };
    return (
      <div>
        <Chart
          height={400}
          data={dv}
          scale={cols}
          padding={[20, 80, 20, 20]}
          forceFit
        >
          <Coord type={"theta"} radius={0.75} innerRadius={0.75} />
          <Axis name="percent" />
          <Legend
            position="right"
            /*offsetY={-400 / 2 + 150}
            offsetX={-100}*/
          />
          <Tooltip
            showTitle={false}
            itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
          />
          <Guide>
            <Html
              position={["50%", "50%"]}
              html="<div style=&quot;color:#8c8c8c;font-size:1.16em;text-align: center;width: 10em;&quot;>总消费<br><span style=&quot;color:#262626;font-size:2.5em&quot;>200,323</span></div>"
              alignX="middle"
              alignY="middle"
            />
          </Guide>
          <Geom
            type="intervalStack"
            position="percent"
            color="item"
            tooltip={[
              "item*percent",
              (item, percent) => {
                percent = percent * 100 + "%";
                return {
                  name: item,
                  value: percent
                };
              }
            ]}
            style={{
              lineWidth:8,
              stroke: "#fff"
            }}
          >
            <Label
              content="percent"
              formatter={(val, item) => {
                return item.point.item + ": " + val;
              }}
            />
          </Geom>
        </Chart>
      </div>
    );
  }
}

