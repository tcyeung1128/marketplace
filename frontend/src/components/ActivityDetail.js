import React from 'react'
import { useParams, Link ,useNavigate} from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { ActivityContext } from "../context";
import { activityDetail } from "../Service/webService";
import '../components/componentsCSS/ActivityDetail.css'

export default function ActivityDetail() {
  let params = useParams();
  const history = useNavigate();
  const [activity,setActivity]=useState(null);
  console.log(params.activity_ID);
  useEffect(() => {
    new Promise(function (resolve, reject) {
      resolve();
      reject();
    })
      .then(() => {
        console.log(params.activity_ID)
        return activityDetail(params.activity_ID);
      })
      .then((data) => {
        setActivity(data);
        console.log(activity);
      });
  }, []);

  return (
    <div>
      <div>
        {
          activity?
          <div className='activityDetailDiv'>
            <div className='activityDetailCard'>
            <h3 className='activityDetailTitle'>
              {activity[0].Activity_Name}
            </h3>
            <h5>
              {activity[0].Activity_Description}
            </h5>
            </div>
          </div>
          :<h1>Loading</h1>
        }
      </div>
    </div>
  )
}
