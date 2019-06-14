'use strict';

const pgBoss = require('../../src');

jest.mock('pg-boss', () => {
  return jest.fn().mockImplementation(() => {
    return {
      start: () => {},
      stop: () => {},
      publish: () => {},
      subscribe: (queue, handler) => handler && handler(),
    };
  });
});

const { ServiceBroker } = require('moleculer');

describe('Test PgBoss constructor', () => {
  const broker = new ServiceBroker();
  const createService = options => broker.createService(pgBoss, options);

  it('should be created with connection string', () => {
    const service = createService({
      pgBossOptions: { connectionString: 'blank' },
    });

    expect(service).toBeDefined();
    expect(service.$connectionParam).toBeDefined();
  });

  it('should be created with connection options', () => {
    const service = createService({
      pgBossOptions: { options: {} },
    });

    expect(service).toBeDefined();
    expect(service.$connectionParam).toBeDefined();
  });

  it('should not be created', () => {
    const service = createService({});

    expect(service).toBeDefined();
  });
});

describe('Test PgBoss start and stop handler', () => {
  const broker = new ServiceBroker();

  broker.createService({
    name: 'pg-boss',
    mixins: [pgBoss],
    pgBossOptions: { connectionString: 'blank' },
  });

  it('should call start', () => {
    return broker.start().then(() => {});
  });

  it('should call stop', () => {
    return broker.stop().then(() => {});
  });
});

describe('Test PgBoss pub-sub', () => {
  const broker = new ServiceBroker();

  const service = broker.createService({
    name: 'pg-boss',
    mixins: [pgBoss],
    pgBossOptions: { connectionString: 'blank' },
  });

  it('should call publish', () => {
    Promise.resolve(
      broker.start().then(service.publish('test-queue', 'test data'))
    );
  });

  it('should call subscribe', () => {
    const handler = jest.fn(() => {});

    Promise.resolve(
      broker.start().then(service.subscribe('test-queue', handler))
    );

    expect(handler).toHaveBeenCalledTimes(1);
  });
});
