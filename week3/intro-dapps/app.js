
window.onload = () => {
    getElectionName();
    getCandidates();
    contract.on("Vote", onVoteCallback);
}


async function getElectionName() {
    let result = await contract.name();
    $('#name').html(result.toString());
}

async function getCandidates() {
    let numCandidate = await contract.getNumCandidate();
    for (var i = 0; i < numCandidate; i++) {
        let candidate = await contract.candidates(i);
        addCandidateToUI(candidate, i);
    }
}

async function addCandidateToUI(candidate, id) {
    let vote = candidate.voteCount;
    let total = await contract.totalVotes();
    let percentage = (vote * 100 / total).toFixed(2);
    percentage = isNaN(percentage)? 0 : percentage;

    $('#candidates').append(getCandidateHtml(candidate.name, id, percentage));
}

function getCandidateHtml(name, id, vote) {
    var html = `
                <div id="${name}" class="container candidate">
                    <div class="row">
                        <p class="lead">${name}</p>
                        <button type="button" class="btn btn-outline-primary btn-sm" data-index="${id}">Vote</button>
                    </div>
                    <div class="progress"><div class="progress-bar bg-info" role="progressbar" style="width: ${vote + "%"}" aria-valuenow="${vote}" aria-valuemin="0" aria-valuemax="100">${vote + "%"}</div></div>
                </div>
            `;
    return html;
}

$(document).on('click', '.btn', function (e) {
    e.preventDefault(e);
    var candidateID = $(this).attr("data-index");
    contract.vote(candidateID).then(tx => console.log(tx));
})


async function onVoteCallback() {
    $('#candidates').empty();
    getCandidates();
}
