module.exports = () => {
    const data = { goodsInfos: [], purchaseRequests: [] }
    const randomData = generateRandomData(15);

    for (let i = 0; i < randomData.length; i++) {
      data.goodsInfos.push({ id: i, goodsInfo: randomData[i] })
    }
    return data
  }
  
const generateRandomData = (amount) => {
    let goodsLoaded = new Array(amount);

    for (let i = 0; i < goodsLoaded.length; i++) {
      const addresses = new Array(getRandomInt(1, 5)).fill({}).map((value, index) => {
        value = {
          address: `some address ${i}-${index}`,
          coordinates: getRandomCoordinatesFromMoscow()
        }
        return value;
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

const MOSCOW_COORDINATES = {
  begin: {longitude: 37.428645, latitude: 55.876448},
  end: {longitude: 37.835122, latitude: 55.653490}
}

function getRandomCoordinatesFromMoscow() {
  return {
      longitude: getRandomArbitrary(MOSCOW_COORDINATES.begin.longitude, MOSCOW_COORDINATES.end.longitude),
      latitude: getRandomArbitrary(MOSCOW_COORDINATES.begin.latitude, MOSCOW_COORDINATES.end.latitude)
  }
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}