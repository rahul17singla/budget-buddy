import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js';
import Labels from './Labels';
import { default as api } from '../store/apiSlice';
import { chartData, getTotal } from '../helper/helper';

Chart.register(ArcElement);

function Graph() {
    const { data, isFetching, isSuccess, isError } = api.useGetLabelsQuery();
    // console.log(data);
    let graphData;

    if (isFetching) {
        graphData = <div>Fetching</div>
    }
    else if (isSuccess) {
        // chartData(data);
        // const d = getLabels(data, 'type');
        graphData = <Doughnut {...chartData(data)} ></Doughnut>
    }
    else if (isError) {
        graphData = <div>Error!!!</div>
    }



    return (
        <div className="flex justify-content max-w-xs mx-auto">
            <div className="item">
                <div className="chart relative">
                    {/* chart */}
                    {graphData}
                    <h3 className="mb-4 font-bold text-3xl title">Total
                        <span className="block text-3xl text-emerald-400">&#8377;{getTotal(data) ?? 0}</span>
                    </h3>
                </div>
                <div className="flex flex-col py-10 gap-4">
                    {/* Labels */}
                    <Labels></Labels>
                </div>
            </div>
        </div>
    )
}

export default Graph;