document.querySelector('#clickHere').addEventListener('click', makeReq)


async function makeReq(){

    const coffeeName = document.querySelector('#inputName').value;
    const res = await fetch(`/api?coffee=${coffeeName}`);
    const data = await res.json();
    
    console.log(data);
    document.querySelector('#coffeeName').innerText += ` ${data.name}`;
    document.querySelector('#regionOfOrigin').innerText += ` ${data.region}`;
    document.querySelector('#color').innerText += ` ${data.color}`;
    document.querySelector('#served').innerText += ` ${data.served}`;
    document.querySelector('#preparation').innerText += ` ${data.preparation}`;
    document.querySelector('img').src = data.image;

}