
function Credit({credit}) {
    const currencyFormat = (number) => {
        return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(number);
    }

    return (
        <div className="credit">
            <p><i class="fa-solid fa-piggy-bank"></i> Solde : {currencyFormat(credit)}</p>
        </div>
    );
}

export default Credit;