let round = 1;
let turn = 1;

let point_1 = 0;
let point_2 = 0;
let tile_1 = 18;
let tile_2 = 18;

let select1P = 0;
let select2P = 0;

function selectHand(hand) {
  const isSucceed = setHand(hand);
  if (isSucceed) {
    judge();
    view();
  }
}

function setHand(hand) {
  if (turn == 1) {
    if (tile_1 < hand) {
      window.alert("タイル不足！選び直して！");
      return false;
    }
    select1P = hand;
    tile_1 -= hand;
  } else if (turn == 2) {
    if (tile_2 < hand) {
      window.alert("タイル不足！選び直して！");
      return false;
    }
    select2P = hand;
    tile_2 -= hand;
  }

  return true;
}

function judge() {
  let upPoint = 1;
  if (round == 6 || round == 10) {
    upPoint = 2;
  }

  if (turn == 2) {
    if (
      (select1P == 0 && select2P == 2) ||
      (select1P == 2 && select2P == 5) ||
      (select1P == 5 && select2P == 0)
    ) {
      point_1 += upPoint;
      viewAlertMessage("1Pの勝ち！" + "\n1Pの番デス。交代してください。");
    } else if (
      (select1P == 2 && select2P == 0) ||
      (select1P == 5 && select2P == 2) ||
      (select1P == 0 && select2P == 5)
    ) {
      point_2 += upPoint;
      viewAlertMessage("2Pの勝ち！" + "\n1Pの番デス。交代してください。");
    } else {
      // pass
      viewAlertMessage("あいこ！" + "\n1Pの番デス。交代してください。");
    }
  }

  // next
  if (turn == 2) {
    round++;
    turn = 1;
  } else {
    turn++;
  }
}

function view() {
  const viewRound = document.getElementById("view-round");
  const viewTurn = document.getElementById("view-turn");
  const viewPoint = document.getElementById("view-point");
  const viewTile = document.getElementById("view-tile");

  if (round <= 10) {
    let nextRound = round + "回戦";
    let nextTurn = "1P";
    let nextPoint = point_1;
    let nextTile = tile_1;

    if (turn == 2) {
      nextTurn = "2P";
      nextPoint = point_2;
      nextTile = tile_2;

      viewAlertMessage("2Pの番デス。交代してください。");
    }

    viewRound.innerHTML = nextRound;
    viewTurn.innerHTML = nextTurn + "の番デス";
    viewPoint.innerHTML = nextPoint + "点";
    viewTile.innerHTML = nextTile + "本";
  } else {
    point_1 -= tile_1;
    point_2 -= tile_2;

    let resultMessage = "最終結果：";
    if (point_1 > point_2) {
      resultMessage += "1Pの勝ちデス";
    } else if (point_1 < point_2) {
      resultMessage += "2Pの勝ちデス";
    } else {
      resultMessage += "引き分けデス";
    }

    viewRound.innerHTML = "終了！";
    viewTurn.innerHTML = resultMessage;
    viewPoint.innerHTML = "";
    viewTile.innerHTML = "";

    document.getElementById("button-gu").disabled = true;
    document.getElementById("button-choki").disabled = true;
    document.getElementById("button-pa").disabled = true;

    viewAlertMessage(resultMessage);
  }
}

function viewAlertMessage(message) {
  window.alert(message + "\n \n \n" + "1P:" + point_1 + " 2P:" + point_2);
}

// ready
window.alert("ゲームスタート!");
view();
