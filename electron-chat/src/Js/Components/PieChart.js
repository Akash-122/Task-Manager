import React, { useEffect, useState } from "react";
import { PieChart } from "react-minimal-pie-chart";

function CategoryChart({items, todoCategories}) {
    const [frequency, setFrequency] = useState([]);
    const [pieChartData, setPieChartData] = useState([]);
    const generateRandomColor = () => {
        // console.log('#' + Math.floor(Math.random()*16777215).toString(16));
        return '#' + Math.floor(Math.random()*16777215).toString(16);
    };
    

    useEffect(() => {
        const toUpdateFrequency = [];
        for (let index = 0; index < todoCategories.length; index++) {
            toUpdateFrequency.push(0);
        }
        // console.log('initial', toUpdateFrequency);
        for (let index = 0; index < items.length; index++) {
            const element = items[index];
            // console.log('element', element);
            toUpdateFrequency[element.category]++;
        }
        setFrequency(toUpdateFrequency);
    }, [items, todoCategories]);

    useEffect(() => {
        const toUpdatePieChartData = [];
        for (let index = 0; index < frequency.length; index++) {
            const element = frequency[index];
            toUpdatePieChartData.push({
                title: todoCategories[index] ? todoCategories[index].title : index.toString(),
                value: element,
                color: generateRandomColor(),
            })
        }
        setPieChartData(toUpdatePieChartData);
        // console.log('frequency', frequency);
    }, [frequency]);

    useEffect(() => {
        console.log('pieChartData', pieChartData);
    }, [pieChartData]);

  return (
    <PieChart
      data={pieChartData}
    />
    // <div>
    //     Pie
    // </div>
  );
}

export default CategoryChart;
