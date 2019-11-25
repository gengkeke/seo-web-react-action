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

export default class Line extends React.Component {
    render() {
        const data = [
            {
                date: " 2019-08-01",
                value: 84.0
            },
            {
                date: " 2019-08-02",
                value: 14.9
            },
            {
                date: " 2019-08-03",
                value: 17.0
            },
            {
                date: " 2019-08-04",
                value: 20.2
            },
            {
                date: " 2019-08-05",
                value: 55.6
            },
            {
                date: " 2019-08-06",
                value: 56.7
            },
            {
                date: " 2019-08-07",
                value: 30.6
            },
            {
                date: " 2019-08-08",
                value: 63.2
            },
            {
                date: " 2019-08-09",
                value: 24.6
            },
            {
                date: " 2019-08-10",
                value: 14.0
            },
            {
                date: " 2019-08-11",
                value: 9.4
            },
            {
                date: " 2019-08-12",
                value: 6.3
            }
        ];
        const cols = {
            date: {
                alias: "日期"
            },
            value: {
                alias: "消费"
            }
        };

        const xTitle = {
            autoRotate: {Boolean}, // 是否需要自动旋转，默认为 true
            offset: 40, // 设置标题 title 距离坐标轴线的距离
            textStyle: {
                fontSize: '12',
                textAlign: 'center',
                fill: '#999',
                rotate: 0
            }, // 坐标轴文本属性配置
            position: 'end' || 'center' || 'start' // 标题的位置，**新增**
        };
        const yTitle = {
            autoRotate: {Boolean}, // 是否需要自动旋转，默认为 true
            offset: 40, // 设置标题 title 距离坐标轴线的距离
            textStyle: {
                fontSize: '12',
                textAlign: 'center',
                fill: '#999',
                rotate: 0
            }, // 坐标轴文本属性配置
            position: 'end' || 'center' || 'start', // 标题的位置，**新增**
        };
        //可配置样式
        const tickLine = {
            lineWidth: 1, // 刻度线宽
            stroke: '#ccc', // 刻度线的颜色
            length: 5, // 刻度线的长度, **原来的属性为 line**,可以通过将值设置为负数来改变其在轴上的方向
        };
        return (
            <div>
                <Chart height={400} padding={[25,15,50,60]}  data={data} scale={cols} forceFit>
                    <Axis
                        name="date"
                        title={xTitle}
                        tickLine={tickLine}
                        line={{
                            stroke: "#E6E6E6"
                        }}
                    />
                    <Axis
                        name="value"
                        tickLine={tickLine}
                        //grid={null}
                        title={yTitle}
                        line={{
                            stroke: "#E6E6E6"
                        }}
                    />
                    <Tooltip/>
                    <Geom
                        type="line"
                        position="date*value"
                        size={2}
                        //color="l (270) 0:rgba(255, 146, 255, 1) .5:rgba(100, 268, 255, 1) 1:rgba(215, 0, 255, 1)"
                        shape="smooth"
                        /*style={{
                            shadowColor: "l (270) 0:rgba(21, 146, 255, 0)",
                            shadowBlur: 60,
                            shadowOffsetY: 6
                        }}*/
                    />
                    <Geom
                        type="point"
                        position="date*value"
                        size={4}
                        shape={"circle"}
                        style={{
                            stroke: "#fff",
                            lineWidth: 1
                        }}
                    />
                </Chart>
            </div>
        );
    }
}
