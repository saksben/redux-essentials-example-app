import React from "react";
import { parseISO, formatDistanceToNow, parse } from "date-fns";

// TimeAgo component to show how much time has passed since post was created
export const TimeAgo = ({timestamp}) => {
    let timeAgo = ""
    if (timestamp) {
        const date = parseISO(timestamp)
        const timePeriod = formatDistanceToNow(date)
        timeAgo = `${timePeriod} ago`
    }
    return (
        <span title={timestamp}>
            &nbsp; <i>{timeAgo}</i>
        </span>
    )
}