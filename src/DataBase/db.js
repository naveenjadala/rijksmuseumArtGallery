import SQLite from 'react-native-sqlite-storage';

// const db = SQLite.openDatabase({name: 'artgallery.db', createFromLocation: 1});

const db = SQLite.openDatabase(
  {name: 'artgallery.db', location: 'default', createFromLocation: 2},
  () => {
    console.log('Database opened successfully');
  },
  error => {
    console.error('Error opening database:', error);
  },
);

const setupDatabase = () => {
  db.transaction(
    tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS favorites (id INTEGER PRIMARY KEY AUTOINCREMENT, detailKey TEXT, artData TEXT)',
        [],
        (_, results) => {
          if (results.rowsAffected > 0) {
            console.log('Database setup successful');
          } else {
            console.log('Database setup failed');
          }
        },
        (_, error) => {
          console.error('Error during database setup:', error);
        },
      );
    },
    error => {
      console.error('Transaction error during database setup:', error);
    },
  );
};

export {db, setupDatabase};
