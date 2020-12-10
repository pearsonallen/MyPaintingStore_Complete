import axios from "axios";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaintBrush, faRuler } from '@fortawesome/free-solid-svg-icons'

function Distance() {
    const [distance, setDistance] = useState(0);
    const [paintingStatusMessage, setPaintingStatusMessage] = useState("Not Painting");

    useEffect(() => {
        const interval = setInterval(() => {
            axios.get(process.env.REACT_APP_API + "/GetDistance").then((response) => {
                setDistance(response.data);
                if (response.data <= 20) {
                    setPaintingStatusMessage("I'm Painting");
                } else if (response.data <= 50) {
                    setPaintingStatusMessage("I'm close to painting!");
                } else {
                    setPaintingStatusMessage("I'm NOT painting right now");
                }
            });
        }, 1000);
        return () => clearInterval(interval);

    }, [])

    return <div className="distance">
        <div className="distance-measurement">
            <FontAwesomeIcon icon={faRuler} />
            {distance} CM
        </div>
        <div className="painting-status">
            <FontAwesomeIcon icon={faPaintBrush} />
            {paintingStatusMessage}
        </div>
    </div>
}

export default Distance;