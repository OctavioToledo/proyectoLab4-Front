import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { useState } from 'react';
import { Instrument } from '../Interface/types';
import PreferenceMP from '../Interface/PreferenceMP';
import Pedido from '../Interface/Pedido';
import "../styles/CheckoutMP.css"

async function createPreferenceMP(pedido: Pedido): Promise<PreferenceMP> {
    const urlServer = 'http://localhost:8080/api/mercadopago/create_preference';
    const response = await fetch(urlServer, {
        method: "POST",
        body: JSON.stringify(pedido),
        headers: {
            "Content-Type": 'application/json'
        }
    });
    if (!response.ok) {
        throw new Error(`Error creating preference: ${response.statusText}`);
    }
    return await response.json() as PreferenceMP;
}

interface CheckoutMPProps {
    savePedido: (cartData: { id: string, quantity: number, precio: number }[]) => Promise<Pedido>;
    cart: Instrument[];
    total: number;
}

function CheckoutMP({ savePedido, cart, total }: CheckoutMPProps) {
    const [idPreference, setIdPreference] = useState<string>('');

    const handleCheckout = async () => {
        if (total > 0) {
            try {
                // Crear los datos del pedido basados en el carrito
                const cartData = cart.map(item => ({
                    id: item.id,
                    quantity: item.quantity,
                    precio: item.precio
                }));

                // Guardar el pedido en la base de datos
                const savedPedido = await savePedido(cartData);

                // Crear la preferencia en Mercado Pago con el pedido guardado
                const preferenceMP = await createPreferenceMP(savedPedido);

                console.log("Preference id: " + preferenceMP.id);
                if (preferenceMP) {
                    setIdPreference(preferenceMP.id);
                }
            } catch (error) {
                console.error("Error during checkout: ", error);
            }
        } else {
            alert("Agregue al menos un producto al carrito");
        }
    }

    initMercadoPago('TEST-f08f2d01-1222-43e9-a16c-5404897b393a', { locale: 'es-AR' });

    return (
        <div>
            <button onClick={handleCheckout} className='btMercadoPago'>COMPRAR con <br /> Mercado Pago</button>
            <div className={idPreference ? 'divVisible' : 'divInvisible'}>
                <Wallet initialization={{ preferenceId: idPreference, redirectMode: "blank" }} customization={{ texts: { valueProp: 'smart_option' } }} />
            </div>
        </div>
    );
}

export default CheckoutMP;
