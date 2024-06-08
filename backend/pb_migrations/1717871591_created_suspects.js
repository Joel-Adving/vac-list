/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "w2016vzuz7uwi6v",
    "created": "2024-06-08 18:33:11.836Z",
    "updated": "2024-06-08 18:33:11.836Z",
    "name": "suspects",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "ejb0jbhf",
        "name": "steam_id",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "h9n3tybk",
        "name": "suspect_type",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "nrzv1ti9",
        "name": "added_by",
        "type": "json",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSize": 2000000
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("w2016vzuz7uwi6v");

  return dao.deleteCollection(collection);
})
