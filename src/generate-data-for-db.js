module.exports = () => {
    const data = { goodsInfos: [] }
    const randomData = generateRandomData(3);

    for (let i = 0; i < randomData.length; i++) {
      data.goodsInfos.push({ id: i, goodsInfo: randomData[i] })
    }
    return data
  }
  
const generateRandomData = (amount) => {
    let goodsLoaded = new Array(amount);

    for (let i = 0; i < goodsLoaded.length; i++) {
      const addresses = new Array(getRandomInt(1, 5)).fill({
        address: "some address",
        coordinates: {latitude: 1, longitude: 2}
      });

      goodsLoaded[i] = {
        name: 'Товар номер ' + i,
        price: getRandomInt(100, 300000),
        image: "/assets/images/goods-placeholder.png",
        addresses: addresses
      }
    }

    return goodsLoaded;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}
