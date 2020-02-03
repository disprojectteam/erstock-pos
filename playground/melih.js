const telemetry = require('erdis').Telemetry;

test();


async function test() {

    var t = await new telemetry();

    t.addDataLog({ dataType: 'inventDocument', dataValue: 'data1', processType: 2 });
} 