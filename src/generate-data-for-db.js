const GOODS_GENERATE = 50;

module.exports = () => {
    const data = { goodsInfos: [], purchaseRequests: [] }
    const randomData = generateRandomData(GOODS_GENERATE);

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
        price: getRandomInt(100, 20000),
        //image: "/assets/images/goods-placeholder.png",
        image: GOODS_URLS[getRandomInt(0, GOODS_URLS.length)],
        description: DESCRIPTIONS[getRandomInt(0, DESCRIPTIONS.length)],
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

const GOODS_URLS = [
  "https://static.onlinetrade.ru/img/items/m/operativnaya_pamyat_kingston_ddr4_16gb_2666_mhz_pc_21300_kvr26n19d8_16__1.jpg",
  "https://cdn1.ozone.ru/multimedia/c1200/1019626322.jpg",
  "https://img.oldi.ru/upload/resaiz_images_catalog/big/101/178086/178086_1.jpg",
  "https://3dnews.ru/assets/external/illustrations/2017/10/12/959892/msi2.jpg",
  "https://geekkies.in.ua/wp-content/uploads/2017/06/chto-takoe-videokarta-kompjutera_1-630x315.png",
  "https://itc.ua/wp-content/uploads/2021/07/screen_shot_2021_07_29_at_5.08.39_pm_1.0.png",
  //"/assets/images/goods-placeholder.png",
  "https://htfi.ru/img/processor_iz_chego_sostoit_2.jpg",
  "https://avatars.mds.yandex.net/get-mpic/4397502/img_id4195389768439950440.jpeg/orig",
  "https://www.icover.ru/upload/resize_cache/iblock/30d/1300_700_1/30dc328f0da87b1adb86c040ce865cd6.jpg",
  "https://avatars.mds.yandex.net/get-mpic/3907093/img_id8189838414330765612.jpeg/orig"
]

const DESCRIPTIONS = [
  "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui aliquam corporis laboriosam fuga dolorem dolores perspiciatis dolore sint distinctio, nemo ullam dolorum harum asperiores deleniti rerum laudantium aperiam dolor? Et!",
  "Some small description with details and useful info",
  "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui aliquam corporis laboriosam fuga dolorem dolores perspiciatis dolore sint distinctio, nemo ullam dolorum harum asperiores deleniti rerum laudantium aperiam dolor? Et! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui aliquam corporis laboriosam fuga dolorem dolores perspiciatis dolore sint distinctio, nemo ullam dolorum harum asperiores deleniti rerum laudantium aperiam dolor? Et! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui aliquam corporis laboriosam fuga dolorem dolores perspiciatis dolore sint distinctio, nemo ullam dolorum harum asperiores deleniti rerum laudantium aperiam dolor? Et! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui aliquam corporis laboriosam fuga dolorem dolores perspiciatis dolore sint distinctio, nemo ullam dolorum harum asperiores deleniti rerum laudantium aperiam dolor? Et!",
  null
]