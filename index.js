var fs = require('fs'),
	util = require('util');
/**
 * 将path路径下的所有文件以source中的json串
 * key去匹配，相匹配的字符串替换成value的值
 * @param {Object} path
 * @param {Object} source
 */
function retrieveFile(path,source){
	
	fs.readdir(path, function(err, files){
		//err 为错误 , files 文件名列表包含文件夹与文件
		if(err){
			console.log('error:\n' + err);
			return;
		}
	
		files.forEach(function(file){
			fs.stat(path + '/' + file, function(err, stat){
				if(err){console.log(err); return;}
				if(stat.isDirectory()){					
					// 如果是文件夹遍历
					retrieveFile(path + '/' + file,source);
				}else{
					fs.readFile(path + '/' + file,'utf-8',function(err,data){
						var newData = replaceStr(source,data);
						writeFile(path + '/' + file,newData);
					});
				}
			});
			
		});
	});
}
/**
 * 字符串替换
 * @param {Object} source
 * @param {Object} data
 */
function replaceStr(source,data){
	var re;
	for(var i in source){
		re = new RegExp(i,"g");
		console.log("re=="+re);
		data = data.replace(re,source[i]);		
	}
	return data;
}
/**
 * 将内容写入文件
 * @param {Object} fileRoute
 * @param {Object} data
 */
function writeFile(fileRoute,data){
	fs.writeFile(fileRoute, data, (err) => {
	  if (err) throw err;
	  console.log(fileRoute+'：写入完成');
	});
}

module.exports = retrieveFile;