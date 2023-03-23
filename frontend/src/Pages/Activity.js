import React from "react";
import { ActivityContext } from "../context";
import { activity } from "../Service/webService";
import { useState, useEffect, useContext } from "react";
import "./PagesCSS/Activity.css";
import { Link, Route } from "react-router-dom";

export default function Activity() {
  const { activityContext, setActivityContext } = useContext(ActivityContext);

  useEffect(() => {
    new Promise(function (resolve, reject) {
      resolve();
      reject();
    })
      .then(() => {
        return activity();
      })
      .then((data) => {
        setActivityContext(data);
        console.log(activityContext);
      });
  }, []);

  return (
    <div>
      <div className="activityBackground">
        {activityContext?.map((activity) => (
          <div key={activity.Activity_ID} className="activityCard">
            <Link
              to={"/activity/" + activity.Activity_ID}
              style={{ textDecoration: "none" ,color:'black'}}
            >
              <div>
                <div className="activityName">{activity.Activity_Name}</div>

                <div className="activityDate">
                  {new Date(activity.Activity_Date).getDate() +
                    "-" +
                    new Date(activity.Activity_Date).getMonth() +
                    "-" +
                    new Date(activity.Activity_Date).getFullYear()}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
