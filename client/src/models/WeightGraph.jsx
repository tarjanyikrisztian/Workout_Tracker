import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import '../css/Profile.css'
import { motion, AnimatePresence } from "framer-motion"
import { Line } from 'react-chartjs-2';


export const WeightGraph = () => {
    const dispatch = useDispatch();

    const { user } = useSelector(state => state.auth);

    let today = new Date();
    let todayDay = String(today.getDate()).padStart(2, '0');
    let todayMonth = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let todayYear = today.getFullYear();
    today = todayYear + '-' + todayMonth + '-' + todayDay;

    const userWeights = user.weight;
    const userWeightDates = [];
    const userWeightData = [];

    user.weightDate.forEach(date => {
        userWeightDates.push(date.split('T')[0]);
    });

    for (let i = 0; i < userWeights.length; i++) {
        userWeightData.push({x: userWeightDates[i], y: userWeights[i]});
    }

    

    const data = {
        datasets: [{
            label: 'Kg',
            data: userWeightData,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }],
    };

    return(
        <>
        <h2>Weight Graph</h2>
        <Line data={data} />
        </>
    )
}
