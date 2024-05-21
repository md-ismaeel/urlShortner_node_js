const input = document.getElementById('inputVal');
const readonly = document.getElementById('readonly');
const shortner = document.getElementById('shorten-btn');


const url = `https://urlshortner-y1na.onrender.com/api/v1/url`

const fetchData = async () => {

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ longUrl: input.value }),
        })
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json()
        // console.log(response);
        console.log(data);
        readonly.value = data.url;
        input.value = '';
    } catch (err) {
        console.error("Fetch data failed", err);
    }
}

// fetchData(url)
shortner.addEventListener('click', fetchData)