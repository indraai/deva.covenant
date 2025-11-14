"use strict";
// Copyright ©2025 Quinn A Michaels; All rights reserved.  
// Legal Signature Required For Lawful Use.  
// Distributed under VLA:42576962201379312005 LICENSE.md

// Networks Deva test file

const {expect} = require('chai')
const CovenantDeva = require('./index.js');

describe(CovenantDeva.me.name, () => {
  beforeEach(() => {
    return CovenantDeva.init()
  });
  it('Check the DEVA Object', () => {
    expect(CovenantDeva).to.be.an('object');
    expect(CovenantDeva).to.have.property('agent');
    expect(CovenantDeva).to.have.property('vars');
    expect(CovenantDeva).to.have.property('listeners');
    expect(CovenantDeva).to.have.property('methods');
    expect(CovenantDeva).to.have.property('modules');
  });
})
