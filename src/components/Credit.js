import { useState } from "react";

function Credit({credit}) {

    return (
        <div className="credit">
            <p><i class="fa-solid fa-piggy-bank"></i> Solde : {credit}€</p>
        </div>
    );
}

export default Credit;