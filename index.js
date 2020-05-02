"use strict";

function httpGet(theUrl, returnHeaders) {
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", theUrl, false); // false for synchronous request
	xmlHttp.send(null);
	if (returnHeaders) {
		return xmlHttp
	}
	return xmlHttp.responseText;
}

function getFirstCommit(owner, repo) {
	let url = baseUrl + '/repos/' + owner + '/' + repo + '/commits';
	let req = httpGet(url, true);
	let firstCommitHash = '';
	if (req.getResponseHeader('Link')) {
		let pageUrl = req.getResponseHeader('Link').split(',')[1].split(';')[0].split('<')[1].split('>')[0];
		let reqLastCommit = httpGet(pageUrl);
		let firstCommit = JSON.parse(reqLastCommit);
		firstCommitHash = firstCommit[firstCommit.length - 1]['sha']
	} else {
		let firstCommit = JSON.parse(req.responseText);
		firstCommitHash = firstCommit[firstCommit.length - 1]['sha'];
	}
	return firstCommitHash;
}

const baseUrl = 'https://api.github.com';

const getCommitVersion = function (owner, repo, shaOrBranch, digits) {

	// let owner = 'getredash';
	// let repo = 'redash';
	// let sha = 'master';
	try {
		shaOrBranch = shaOrBranch || 'master';
		digits = digits || 3;
		let firstCommit = getFirstCommit(owner, repo);
		let compareUrl = baseUrl + '/repos/' + owner + '/' + repo + '/compare/' + firstCommit + '...' + shaOrBranch;
		let commitReq = httpGet(compareUrl);
		let commitCount = JSON.parse(commitReq)['total_commits'] + 1;
		commitCount = commitCount.toString().split('');
		let commitStr = '';
		for (let i = 0; i < commitCount.length; i++) {
			if (i > digits)
				break;
			commitStr += commitCount[i] + '.'
		}
		return commitStr.slice(0, -1);
	} catch (e) {
		console.log(e)
	}


};

const getReleaseVersion = function (owner, repo) {
	try {
		let latestRelease = httpGet(baseUrl + '/repos/' + owner + '/' + repo + '/releases/latest');
		return JSON.parse(latestRelease)['tag_name']
	} catch (e) {
		console.log(e)
	}
};

module.exports = {getCommitVersion: getCommitVersion, getReleaseVersion: getReleaseVersion};

