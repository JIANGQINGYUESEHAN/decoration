import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { isNil } from 'lodash';

import { RedisConfig } from '../types';

/**
 * Redis服务
 */
@Injectable()
export class RedisService {
  /**
   * Redis配置
   */
  protected options: any;

  /**
   * 客户端连接
   */
  protected clients: Map<string, Redis> = new Map();

  constructor(options: any) {
    this.options = options;
  }

  getOptions() {
    return this.options;
  }

  /**
   * 通过配置创建所有连接
   */
  async createClients() {
    console.log(this.options);


    new Redis({
      port: 6379, // Redis port
      host: this.options.host,
      password: this.options.password,
      db: 0, // Defaults to 0
    });
  }

  /**
   * 获取一个客户端连接
   * @param name 连接名称,默认default
   */
  getClient(name?: string): Redis {
    let key = 'default';
    if (!isNil(name)) key = name;
    if (!this.clients.has(key)) {
      throw new Error(`client ${key} does not exist`);
    }
    return this.clients.get(key);
  }

  /**
   * 获取所有客户端连接
   */
  getClients(): Map<string, Redis> {
    return this.clients;
  }
}
