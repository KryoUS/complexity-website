module.exports.dbLogging = {
    toConsole: (error) => {
        //TODO: This needs to be destructured in some way...
        console.log(error);
        //=====EXAMPLE BELOW=====
        // error: column "fields" does not exist
        //     at Parser.parseErrorMessage (C:\Users\Tauru\Development\Complexity\complexity-website\server\node_modules\pg-protocol\dist\parser.js:287:98)
        //     at Parser.handlePacket (C:\Users\Tauru\Development\Complexity\complexity-website\server\node_modules\pg-protocol\dist\parser.js:126:29)
        //     at Parser.parse (C:\Users\Tauru\Development\Complexity\complexity-website\server\node_modules\pg-protocol\dist\parser.js:39:38)
        //     at TLSSocket.<anonymous> (C:\Users\Tauru\Development\Complexity\complexity-website\server\node_modules\pg-protocol\dist\index.js:11:42)
        //     at TLSSocket.emit (node:events:514:28)
        //     at addChunk (node:internal/streams/readable:324:12)
        //     at readableAddChunk (node:internal/streams/readable:297:9)
        //     at Readable.push (node:internal/streams/readable:234:10)
        //     at TLSWrap.onStreamRead (node:internal/stream_base_commons:190:23) {
        // length: 170,
        // severity: 'ERROR',
        // code: '42703',
        // detail: undefined,
        // hint: 'Perhaps you meant to reference the column "characters.titles".',
        // position: '78',
        // internalPosition: undefined,
        // internalQuery: undefined,
        // where: undefined,
        // schema: undefined,
        // table: undefined,
        // column: undefined,
        // dataType: undefined,
        // constraint: undefined,
        // file: 'parse_relation.c',
        // line: '3656',
        // routine: 'errorMissingColumn',
        // query: `SELECT "id","summary","media","character_statistics" FROM "characters" WHERE "fields" IN ('test')`,
        // params: undefined
    }
}