'use strict';
const path = require('path');
const express = require('express');

module.exports = (app) => {
	app.use(express.static(path.join(__dirname, '../src')));

	app.get('/', (req, res) => {
	  res.sendFile(path.resolve(__dirname + '/../index.html'));
	});

	app.get('/bundle.js', (req, res) => {
	  res.sendFile(path.resolve(__dirname + '/../bundle.js'));
	});

	app.get('/style/style.css', (req, res) => {
		res.sendFile(path.resolve(__dirname + '/../style/style.css'));
	});

	app.get('/favicon.ico', (req, res) => {
		res.sendFile(path.resolve(__dirname + '/../style/favicon.ico'));
	});
}