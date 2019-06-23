import React from "react";

export default (props) => (

        <tr>
            <td style={{padding: '10px'}}>{props.title}</td>
            <td style={{padding: '10px'}}>{props.amountPl}</td>
            <td style={{padding: '10px'}}>{props.amountEuro}</td>
            <td onClick={props.onDelete}>Delete</td>
        </tr>

)