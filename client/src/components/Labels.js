import React from 'react'
import { default as api } from '../store/apiSlice';
import { getLabels } from '../helper/helper.js'


function Labels() {

    // console.log(api.useGetCategoriesQuery());
    const { data, isFetching, isSuccess, isError } = api.useGetLabelsQuery();
    // console.log(data);
    let Transactions;

    if (isFetching) {
        Transactions = <div>Fetching</div>
    }
    else if (isSuccess) {
        const d = getLabels(data, 'type');
        Transactions = d.map((v, i) => <LabelComponent key={i} data={v}></LabelComponent>)
    }
    else if (isError) {
        Transactions = <div>Some Error!!!</div>
    }

    return (
        <>
            {Transactions}
        </>
    )
}

export default Labels;


function LabelComponent({ data }) {
    if (!data) {
        return <></>
    }
    return (
        <div className="labels flex justify-between">
            <div className="flex gap-2">
                <div className="w-4 h-2 rounded py-3" style={{ background: data.color ?? "rgb(54, 162, 235)" }}></div>
                <h3 className="text-md">{data.type ?? ""}</h3>
            </div>
            <h3 className="font-bold">{Math.round(data.percent) ?? 0}%</h3>
        </div >
    )
}
