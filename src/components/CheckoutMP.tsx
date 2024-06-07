import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { useState } from 'react';
import PreferenceMP from '../Interface/PreferenceMP';
import "../styles/CheckoutMP.css"
interface Pedido {
    id?: number,
    totalPedido: number 
}

async function createPreferenceMP(pedido?: Pedido) {
    let urlServer = 'http://localhost:8080/api/mercadopago/create_preference';
    const response = await fetch(urlServer, {
        method: "POST",
        body: JSON.stringify(pedido),
        headers: {
            "Content-Type": 'application/json'
        }
    });
    return await response.json() as PreferenceMP;   
}

function CheckoutMP({ montoCarrito = 0 }) {
    const [idPreference, setIdPreference] = useState<string>('');

    const getPreferenceMP = async () => {
        if (montoCarrito > 0) {
            const response: PreferenceMP = await createPreferenceMP({ id: 0, totalPedido: montoCarrito });
            console.log("Preference id: " + response.id);
            if (response && response.id)
                setIdPreference(response.id);
        } else {
            alert("Agregue al menos un instrumento al carrito");
        }
    }

    initMercadoPago('TEST-f08f2d01-1222-43e9-a16c-5404897b393a', { locale: 'es-AR' });

    return (
        <div>
            <button onClick={getPreferenceMP} className='btMercadoPago'>COMPRAR con <br /> Mercado Pago</button>
            <div className={idPreference ? 'divVisible' : 'divInvisible'}>
                <Wallet initialization={{ preferenceId: idPreference, redirectMode: "self" }} customization={{ texts: { valueProp: 'smart_option' }}} />
            </div>
        </div>
    );
}

export default CheckoutMP;
