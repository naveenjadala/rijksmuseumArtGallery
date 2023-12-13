import {db} from './db';

const retrieveArtData = callback => {
  db.transaction(tx => {
    tx.executeSql('SELECT * FROM favorites', [], (tx, results) => {
      const rows = results.rows;
      const dataList = [];
      for (let i = 0; i < rows.length; i++) {
        const item = rows.item(i);
        const jsonData = JSON.parse(item.artData);
        dataList.push(jsonData);
      }
      callback(dataList);
    });
  });
};

const retrieveArtIds = callback => {
  db.transaction(tx => {
    tx.executeSql('SELECT * FROM favorites', [], (tx, result) => {
      const rows = result.rows;
      const dataListIds = [];
      for (let i = 0; i < rows.length; i++) {
        const item = rows.item(i);
        const itemData = item.detailKey;
        dataListIds.push(itemData);
      }
      callback(dataListIds);
    });
  });
};

export {retrieveArtData, retrieveArtIds};
