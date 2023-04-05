
## Installation

```bash
$ npm install
```

or

```bash
$ yarn
```


## Build the app

```bash
$ yarn build
```

## Run

```bash
node dist/main.js
```

## Reproduction

1) `node dist/main.js` after [Build](#build-the-app) step.

2) add `Room` data using below command with [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) vscode's extension or [Postman](https://www.postman.com/)
```http
POST http://localhost:3000/v1/room HTTP/1.1
content-type: application/json

{
    "name": "test place",
    "x": 2,
    "y": 15,
    "z": 1
}
```

then, you should see the response like that:
```js
{
    "name": "test place",
    "players": [],
    "x": 2,
    "y": 15,
    "z": 1,
    "_id": "642ac701288fa88b676ede6b",
    "monsters": [],
    "__v": 0
}
```

&nbsp;
3) update the `Room` model with id: `642ac701288fa88b676ede6b`
```http
PATCH http://localhost:3000/v1/room/642ac701288fa88b676ede6b HTTP/1.1
content-type: application/json

{
    "monsters": [
        {
            "id": "99",
            "name": "ERROR LIST DATA",
            "num": 15
        }
    ]
}
```

and the response:
```js
{
    "_id": "642ac701288fa88b676ede6b",
    "name": "test place",
    "players": [],
    "x": 2,
    "y": 15,
    "z": 1,
    "monsters": [
      {}
    ],
    "__v": 0
}
```

and the console will log a message:
```js
updateRoom UpdateRoomDto {
  // here the first element of the `monsters` field has been converted from object to array
  monsters: [ [ id: '99', name: 'ERROR LIST DATA', num: 15 ] ]
}
```
&nbsp;
4) add `Floor` data
```http
POST http://localhost:3000/v1/floor HTTP/1.1
content-type: application/json

{
    "name": "test floor",
    "bindZ": 94,
    "open": true,
    "boss": [
        {
            "id": "69",
            "name": "boss",
            "num": 10
        }
    ],
    "nextFloorId": "96"
}
```

res:
```js
{
  "bindZ": 94,
  "boss": [
    {
      "id": "69",
      "name": "boss",
      "num": 10
    }
  ],
  "name": "test floor",
  "nextFloorId": "96",
  "open": true,
  "_id": "642acaa1288fa88b676ede77",
  "__v": 0
}
```
&nbsp;
5) update `Floor` with id: `642acaa1288fa88b676ede77`
```http
PATCH http://localhost:3000/v1/floor/642acaa1288fa88b676ede77 HTTP/1.1
content-type: application/json

{
    "name": "test",
    "open": false,
    "nextFloorId": "35",
    "bindZ": 13,
    "boss": [
        {
            "id": "8",
            "name": "PASS DATA",
            "num": 68
        }
    ]
}
```

res:
```js
{
  "_id": "642acaa1288fa88b676ede77",
  "bindZ": 13,
  "boss": [
    {
      "id": "8",
      "name": "PASS DATA",
      "num": 68
    }
  ],
  "name": "test",
  "nextFloorId": "35",
  "open": false,
  "__v": 0
}
```

now the console will log:
```js
updateFloor UpdateFloorDto {
  name: 'test',
  open: false,
  nextFloorId: '35',
  bindZ: 13,
  // the first element has been validated correctly
  boss: [ BossItemDto { id: '8', name: 'PASS DATA', num: 68 } ]
}
```

&nbsp;
6) compare [update-floor.dto.ts](./src/resource/floor/dto/update-floor.dto.ts) with [update-room.dto.ts](./src/resource/room/dto/update-room.dto.ts).


## License

  Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
