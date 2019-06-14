/*
 * moleculer-pg-boss
 */

'use strict';

var PgBoss = require('pg-boss');

/**
 *  Mixin service for pg-boss
 *
 * @name moleculer-pg-boss
 * @module Service
 */
module.exports = {
  name: 'pg-boss',

  /**
   * Methods
   */
  methods: {
    /**
     * Publish a job to queue
     *
     * @param {String} queue
     * @param {Object} payload
     * @param {Object} options
     * @returns {String}
     */
    publish(queue, payload, options) {
      return this.Promise.resolve(this.$boss.publish(queue, payload, options));
    },

    /**
     * Subscribe to a queue
     *
     * @param {String} queue
     * @param {Function} handler
     * @returns {Promise}
     */
    subscribe(queue, handler) {
      return this.Promise.resolve(this.$boss.subscribe(queue, handler));
    },
  },

  /**
   * Service created lifecycle event handler
   */
  created() {
    this.$connectionParam = this.schema.pgBossOptions
      ? this.schema.pgBossOptions.connectionString ||
        this.schema.pgBossOptions.options
      : null;

    this.$boss = new PgBoss(this.$connectionParam); // 'postgres://user:pass@host/database' || {}

    return this.Promise.resolve();
  },

  /**
   * Service started lifecycle event handler
   */
  started() {
    return this.Promise.resolve(this.$boss.start());
  },

  /**
   * Service stopped lifecycle event handler
   */
  stopped() {
    this.$boss && this.$boss.stop();
  },
};
