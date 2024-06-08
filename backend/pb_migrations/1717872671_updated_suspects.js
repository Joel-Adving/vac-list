/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("w2016vzuz7uwi6v")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pquzfo4n",
    "name": "created_old",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 2000000
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("w2016vzuz7uwi6v")

  // remove
  collection.schema.removeField("pquzfo4n")

  return dao.saveCollection(collection)
})
