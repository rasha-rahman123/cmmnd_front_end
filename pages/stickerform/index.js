import {useState} from 'react';

function StickerForm() {

    const sheetsAPI = new URL('https://script.google.com/macros/s/AKfycbzQQK1AFWPBH5a5mjdF3QDS5Bixf23Rk5VeE1sc2QgS2qq5T_o-VbgT/exec');

    const [values, setValues] = useState({ 
        name: '',
        shipping_address_1: '',
        shipping_address_2: '', 
        city: '',
        state: '',
        zipcode: '',
        country: '', 
        email: '',
        phone_number: '',
    });

    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e) => { 
        e.preventDefault();

        Object.keys(values).forEach(key => sheetsAPI.searchParams.append(key, values[key]))

        const response = await fetch(sheetsAPI, { 
            method: "GET",
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        setSubmitted(true);
    }

    const handleInputChange = (event) => { 
        event.persist();
        setValues((values) => ({
            ...values, 
            [event.target.name]: event.target.value
        }));
    }

    const submittedMessage = () => ( 
        <p>Thanks for your submission.</p>
    )

    const form = () => ( 
        <form onSubmit={handleSubmit} className="sticker-form">
            <div>
            <label>Name:</label>
            <input name="name" value={values.name} onChange={handleInputChange} type="text" required/>
            </div>
            <div>
            <label>Address line 1:</label>
            <input name="shipping_address_1" value={values.shipping_address_1} onChange={handleInputChange} type="text" required/>
            </div>
            <div>
            <label>Address line 2:</label>
            <input name="shipping_address_2" value={values.shipping_address_2} onChange={handleInputChange} type="text"/>
            </div>
            <div>
            <label>City:</label>
            <input name="city" value={values.city} onChange={handleInputChange} type="text" required/>
            </div>
            <div>
            <label>State:</label>
            <input name="state" value={values.state} onChange={handleInputChange} type="text" required/>
            </div>
            <div>
            <label>Zipcode:</label>
            <input name="zipcode" value={values.zipcode} onChange={handleInputChange} type="number" required/>
            </div>
            <div>
            <label>Country:</label>
            <input name="country" value={values.country} onChange={handleInputChange} type="text" required/>
            </div>
            <div>
            <label>Email:</label>
            <input name="email" value={values.email} onChange={handleInputChange} type="email" required/>
            </div>
            <div>
            <label>Phone number:</label>
            <input name="phone_number" value={values.phone_number} onChange={handleInputChange} type="number" required/>
            </div>

            <input type="submit"/>
        </form>
    )
    
    const stickerPage = () => ( 
        <div class="stickerform-container">
            <h3>Free Sticker Form</h3>
            {submitted ? submittedMessage() : form()}
        </div>
    )
    
    return stickerPage();
}

export default StickerForm;