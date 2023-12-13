import {db} from './db';

const storeArtData = (detailKey, artData) => {
  const jsonString = JSON.stringify(artData);
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM favorites WHERE detailKey = ?',
      [detailKey],
      (tx, result) => {
        const record = result?.rows;
        if (record?.length > 0) {
          tx.executeSql(
            'DELETE FROM favorites WHERE detailKey = ?',
            [detailKey],
            (tx, res) => {
              console.log(res, "del");
            },
          );
        } else {
          tx.executeSql(
            'INSERT INTO favorites (detailKey, artData) VALUES (?, ?)',
            [detailKey, jsonString],
            (tx, results) => {
              console.log(results);
            },
          );
        }
      },
    );
  });
};

export {storeArtData};
