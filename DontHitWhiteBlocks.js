// LiteLoader-AIDS automatic generated
/// <reference path="c:\Users\HeYuHan\LiteDev/dts/helperlib/src/index.d.ts"/>


// 注册插件
const plugin = {
    Name: "DontHitWhiteBlocks",
    Introduction: "基于 LeviLamina - LSE 引擎 的 别踩白块小游戏 v0.1.0 作者: 梦涵LOVE",
    Version: [0, 1, 0],
    Other: {
        Author: "梦涵LOVE",
        Github: "https://github.com/MengHanLOVE1027/DontHitWhiteBlocks",
        License: "GPL-3.0 license",
    },
}



/**
 * 全局常量模块
 * (Start)
 */

// 声明常量
const plugin_name = "DontHitWhiteBlocks",
    plugin_version = "v0.1.0",
    // cmd_name = "DontHitWhiteBlocks",
    // cmd_alias = "DontHitWhiteBlocks",
    plugin_path = `./plugins/${plugin_name}`

/**
 * 全局常量模块
 * (End)
 */



/**
 * 全局变量模块
 * (Start)
 */

// 声明变量
let pl
let StartBlocks_x = []
let StartBlocks_y = []
let StartBlocks_z = []
let StartBlocks_dimid = []

/**
 * 全局变量模块
 * (End)
 */



/**
 * 绘制游戏
 * @param {Array} x 坐标x
 * @param {Array} y 坐标y
 * @param {Array} z 坐标z
 * @param {Array} dimid 纬度id
 */
let a = []
let ab = 0
let random_number
let c = 0
function Paint(x, y, z, dimid) {
    logger.fatal(x, y, z, dimid)
    random_number = Math.floor(Math.random() * (3 - 0 + 1)) + 0
    mc.setBlock(x[0], y[0] - 1, z[0] + random_number, dimid[0], "minecraft:pink_concrete")
    a[ab] = mc.getBlock(x[0], y[0] - 1, z[0] + random_number, dimid[0])
    setTimeout(GetDown, 1000)
    logger.warn(a[ab].pos, ab)
    ab++
}

function GetDown() {
    log(a[0], ab)
    mc.setBlock(a[ab].pos.x, a[ab].pos.y, a[ab].pos.z, dimid[0], "minecraft:white_concrete")
    mc.setBlock(a[ab].pos.x, a[ab].pos.y - 1, a[ab].pos.z, dimid[0], "minecraft:pink_concrete")
}

function loop() {
    let abcc = setInterval(() => {
        if (c == 0) {
            clearInterval(abcc)
        }
        Paint(StartBlocks_x, StartBlocks_y, StartBlocks_z, StartBlocks_dimid)
    }, 2000);
}

/**
 * 创建和删除画布
 * @param {Player} player 玩家对象
 * @param {Item} item 物品对象
 * @param {Block} block 方块对象
 */
function Create(player, item, block) {
    // 清除背景
    if (item.type == "minecraft:stick") {
        // 此处i是画布的高，从点击的方块开始(y + i(此处是0))，加到 5(原画布高度) + 1 + 1
        // 为什么要 5(原画布高) + 1 呢?因为 i是从0(点击的方块原位置) 开始累加的，如果 i < 5，那么i只能到4，上面一行的结尾方块就没办法清掉了XwX
        for (let i = 0; i < 5 + 1; i++) {
            // logger.log("高: " + i)
            // 此处j是对应 y + i 高度的横向方块数量(对应的z轴为z + j(此处为0))，从对应y + i高度的方块开始向z方向加到 4(原画布宽度) - 1
            for (let j = 0; j <= 4 - 1; j++) {
                // logger.warn("宽: " + j)
                mc.setBlock(block.pos.x, block.pos.y + i, block.pos.z + j, block.pos.dimid, "minecraft:air")
            }
        }
    }
    // 创建背景
    if (item.type != "minecraft:stick") {
        // 此处i是画布的高，从点击的方块开始(y + i(此处是0))，加到 5(原画布高度) + 1
        for (let i = 1; i < 5 + 1; i++) {
            // logger.log("高: " + i)
            for (let j = 0; j <= 4 - 1; j++) {
                // logger.warn("宽: " + j)
                // 此处j是对应 y + i 高度的横向方块数量(对应的z轴为z + j(此处为0))，从对应y + i高度的方块开始向z方向加到 4(原画布宽度) - 1
                mc.setBlock(block.pos.x, block.pos.y + i, block.pos.z + j, block.pos.dimid, "minecraft:white_concrete")
            }
            // 当已经布置完画布后，在 y + (i+1) 这个高在横向布置一行结尾方块来结尾
            if (i == 5) {
                StartBlocks_x = []
                StartBlocks_y = []
                StartBlocks_z = []
                StartBlocks_dimid = []
                // logger.log("结尾方块高: " + (i + 1))
                for (let k = 0; k <= 4 - 1; k++) {
                    // logger.error("结尾方块宽: " + k)
                    mc.setBlock(block.pos.x, block.pos.y + i + 1, block.pos.z + k, block.pos.dimid, "minecraft:purple_concrete")
                    StartBlocks_x[k] = block.pos.x
                    StartBlocks_y[k] = block.pos.y + i + 1
                    StartBlocks_z[k] = block.pos.z + k
                    StartBlocks_dimid[k] = block.pos.dimid
                }
            }
        }
    }
}



function LoadPlugin() {
    mc.listen("onServerStarted", () => {

    })
    mc.listen("onJoin", (player) => {
        pl = player
        logger.log('Player Join!', pl.realName)
        let x = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]
        ]
        let y = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]
        ]
        let z = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]
        ]
        logger.log("I am ABCC.", x[0][1][0])
    })

    // 玩家互动(长按/右键)
    mc.listen("onAttackBlock", (player, block, item) => {
        if (c == 0) { c = 1 } else if (c == 1) { c = 0 }
        loop()
    })
    // 玩家直接点击
    mc.listen("onUseItemOn", (player, item, block) => {
        logger.warn(player.realName, item.type, block.type, block.pos)
        // let test = mc.newScoreObjective("test", "RT")
        let test = mc.getScoreObjective("test")
        test.setDisplay("list")
        test.addScore(pl, 1)
        // logger.log(test.addScore(pl, 1))
        Create(player, item, block)
    })
}


// 加载插件
LoadPlugin()