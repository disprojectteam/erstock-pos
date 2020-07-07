const _ = require("lodash");
const kafka = require("kafka-node");

class traceLog {
	constructor() {
		this.initKafka();
	}
	addLogData(_error, _keyValue, _className) {
		try {
			if (_error) {
				var data = _.pick(_error, ["code", "name", "message", "stack"]);
				var messageToQueue = {
					errorName: data.name,
					errorCode: data.code,
					errorMessage: data.message,
					keyValue: _keyValue,
					errorStack: data.stack.toString().substring(0, 300),
					className: _className,
					methodName: this.findMethodName(_error), 
                    lineOfError: this.findLineOfError(_error),
                    serviceName: process.env.APP_ID,
					createdAt: Date.now()
				};
				var sMessageToQueue = JSON.stringify(messageToQueue);
				this.producer.send(
					[{
						topic: this.topic,
						partition: 0,
						messages: [sMessageToQueue],
						attributes: 0
					// eslint-disable-next-line no-unused-vars
					}],(err, res) => {});
				this.producer.on('error', (err) => {
					if (err.name === 'NestedError') {
						this.client = new kafka.KafkaClient(this.clientOptions);
						this.producer = new kafka.Producer(this.client, {
							requireAcks: 1
						});
						this.producer.on('ready', () => {
							this.producer.send(
								[{
									topic: this.topic,
									partition: 0,
									messages: [sMessageToQueue],
									attributes: 0
								// eslint-disable-next-line no-unused-vars
								}],(err, result) => {}
							);
						})
					}
				})
			}
		} catch (err) {
			console.log(err);
		}

	}
	initKafka() {
		this.topic = 'TRACELOG';
		// this.clientOptions = {
		//   kafkaHost: process.env.Erdis_Kafka_IP",
		// }
		// this.client = new kafka.KafkaClient(this.clientOptions);
		this.client = new kafka.KafkaClient({kafkaHost: process.env.Erdis_Kafka_IP });
		//this.client = new kafka.KafkaClient({ kafkaHost: process.env.Erdis_Kafka_IP });
		this.producer = new kafka.Producer(this.client, {
			requireAcks: 1
		});
	}

	findMethodName(_error) {
        const firstLine = _error.stack.split("\n")[1].toString()
        const methodName = firstLine.trim().split(" ")[1]
        return methodName ? methodName : ' '
    }

    findLineOfError(_error) {
        const firstLine = _error.stack.split("\n")[1].toString()
        const lineOfError = firstLine.trim().split(":")[firstLine.trim().split(":").length - 2]
        return lineOfError ? lineOfError : ' '
	}
	
}
var TraceLog = new traceLog();

module.exports = {
	TraceLog
};