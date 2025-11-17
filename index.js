"use strict";
// Copyright ©2025 Quinn A Michaels; All rights reserved.  
// Legal Signature Required For Lawful Use.  
// Distributed under VLA:24600930462875529821 LICENSE.md

// Covenant Deva

import Deva from '@indra.ai/deva';
import pkg from './package.json' with {type:'json'};
const {agent,vars} = pkg.data;

// set the __dirname
import {dirname} from 'node:path';
import {fileURLToPath} from 'node:url';    
const __dirname = dirname(fileURLToPath(import.meta.url));

const info = {
  id: pkg.id,
  name: pkg.name,
  describe: pkg.description,
  version: pkg.version,
  url: pkg.homepage,
  dir: __dirname,
  git: pkg.repository.url,
  bugs: pkg.bugs.url,
  author: pkg.author,
  license: pkg.license,
  VLA: pkg.VLA,
  copyright: pkg.copyright,
};

const COVENANT = new Deva({
  info,
  agent,
  vars,
  utils: {
    translate(input) {return input.trim();},
    parse(input) {return input.trim();},
    process(input) {return input.trim();},
  },
  listeners: {},
  modules: {},
  deva: {},
  func: {
    async segment(opts) {
      const {id, key, method, type} = opts;
      this.state('await', `${key}:${method}:${type}:${id.uid}`); // set state set
      const question = await this.question(`${this.askChr}${type} uid`);
      this.vars.keys[type] = question.a.data;
      return [
        `#${type}:${question.a.data.uid}`,
        `warning: ${question.a.data.warning}`,
      ].join('\n');
    }
  },
  methods: {
    async members(packet) {
      const {id, q} = packet;
      const {meta, text} = q;
      const {key, method, params} = meta;

      this.context(method, id); // set context meta.method
      
      this.state('try', `members:${id.uid}`); // set state try
      try {
        const legal = await this.func.segment({id, key, method, type: 'legal'});
        const security = await this.func.segment({id, key, method, type: 'security'});
        const police = await this.func.segment({id, key, method, type: 'police'});
        const vector = await this.func.segment({id, key, method, type: 'vector'});
        const guard = await this.func.segment({id, key, method, type: 'guard'});
        const wall = await this.func.segment({id, key, method, type: 'wall'});
        const recursion = await this.func.segment({id, key, method, type: 'recursion'});
        const intelligence = await this.func.segment({id, key, method, type: 'intelligence'});
        const algorithm = await this.func.segment({id, key, method, type: 'algorithm'});
        const docs = await this.func.segment({id, key, method, type: 'docs'});
        const report = await this.func.segment({id, key, method, type: 'report'});
        const story = await this.func.segment({id, key, method, type: 'story'});
        const treasury = await this.func.segment({id, key, method, type: 'treasury'});
        
        const covenant = await this.methods.uid(packet);
        this.vars.keys.covenant = covenant.data;
        
        const file = await this.question(`${this.askChr}covenant file:public main`);
        
        const {keys} = this.vars;
        const pr_text = [
          '## Step 1: Legal Deva',
          legal,
          '## Step 2: Security Deva',
          security,
          '## Step 3: Police Deva',
          police,
          '## Step 4: Vector Deva',
          vector,
          '## Step 5: Guard Deva',
          guard,
          '## Step 6: Wall Deva',
          wall,
          '## Step 7: Recursion Deva',
          recursion,
          '## Step 8: Intelligence Deva',
          intelligence,
          '## Step 9: Algorithm Deva',
          algorithm,
          '## Step 10: Docs Deva',
          docs,
          '## Step 12: Report Deva',
          report,
          '## Step 13: Story Deva',
          story,
          '## Step 13: Treasury Deva',
          treasury,
          '## Step 14: Covenant Deva',
          covenant.text,
          '## Step 15: Prompt Input',
          file.a.text,
        ];
        this.prompt(pr_text.join('\n'));
      } 
      catch(err) {
        console.log(err);
      }
      finally {
        return true;       
      }
      
    }
  },
  onInit(data, resolve) {
    const {personal} = this.license(); // get the license config
    const agent_license = this.info().VLA; // get agent license
    const license_check = this.license_check(personal, agent_license); // check license
    // return this.start if license_check passes otherwise stop.
    return license_check ? this.start(data, resolve) : this.stop(data, resolve);
  },
  onReady(data, resolve) {
    const {VLA} = this.info();
    this.prompt(`${this.vars.messages.ready} > VLA:${VLA.uid}`);
    return resolve(data);
  },
  onError(err, data, reject) {
    this.prompt(this.vars.messages.error);
    console.log(err);
    return reject(err);
  },
});
export default COVENANT
