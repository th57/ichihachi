let round = 1;
let turn = 1;
let point_1 = 0;
let point_2 = 0;
let tile_1 = 18;
let tile_2 = 18;

let select1P = 0;
let select2P = 0;

function gu() {
  //window.alert("グー！");

  if (turn == 1) {
    select1P = 0;
  } else if (turn == 2) {
    select2P = 0;
  }

  judge();
  next();
}
function choki() {
  //window.alert("チョキ！");

  if (turn == 1) {
    if (tile_1 < 2) {
      window.alert("タイル不足！選び直して！");
      return;
    }
    select1P = 1;
    tile_1 -= 2;
  } else if (turn == 2) {
    if (tile_2 < 2) {
      window.alert("タイル不足！選び直して！");
      return;
    }
    select2P = 1;
    tile_2 -= 2;
  }

  judge();
  next();
}
function pa() {
  //window.alert("パー！");

  if (turn == 1) {
    if (tile_1 < 5) {
      window.alert("タイル不足！選び直して！");
      return;
    }
    select1P = 2;
    tile_1 -= 5;
  } else if (turn == 2) {
    if (tile_2 < 5) {
      window.alert("タイル不足！選び直して！");
      return;
    }
    select2P = 2;
    tile_2 -= 5;
  }

  judge();
  next();
}

function judge() {
  let upPoint = 1;
  if (round == 6 || round == 10) {
    upPoint = 2;
  }

  if (turn == 2) {
    if (
      (select1P == 0 && select2P == 1) ||
      (select1P == 1 && select2P == 2) ||
      (select1P == 2 && select2P == 0)
    ) {
      window.alert("1Pの勝ち！");
      point_1 += upPoint;
    } else if (
      (select1P == 1 && select2P == 0) ||
      (select1P == 2 && select2P == 1) ||
      (select1P == 0 && select2P == 2)
    ) {
      window.alert("2Pの勝ち！");
      point_2 += upPoint;
    } else {
      // pass
      window.alert("あいこ！");
    }

    round++;
    turn = 1;
  } else {
    turn++;
  }
}

function next() {
  const viewRound = document.getElementById("view-round");
  const viewTurn = document.getElementById("view-turn");
  const viewPoint = document.getElementById("view-point");
  const viewTile = document.getElementById("view-tile");

  let nextRound = "";
  let nextTurn = "";
  let nextPoint = "";
  let nextTile = "";

  if (round < 10) {
    nextRound = round + "回戦";

    if (turn == 1) {
      nextTurn = "1P";
      nextPoint = point_1;
      nextTile = tile_1;
    } else if (turn == 2) {
      nextTurn = "2P";
      nextPoint = point_2;
      nextTile = tile_2;
    }

    if (round == 1) {
      window.alert("ゲームスタート!");
    } else {
      window.alert(nextTurn + "の番デス。交代してください。");
    }

    viewRound.innerHTML = nextRound;
    viewTurn.innerHTML = nextTurn + "の番デス";
    viewPoint.innerHTML = nextPoint + "点";
    viewTile.innerHTML = nextTile + "本";
  } else {
    viewRound.innerHTML = "終了！";
    if (point_1 > point_2) {
      viewTurn.innerHTML = "最終結果：1Pの勝ちデス";
    } else if (point_1 < point_2) {
      viewTurn.innerHTML = "最終結果：2Pの勝ちデス";
    } else {
      viewTurn.innerHTML = "最終結果：引き分けデス";
    }
  }
}

next();
