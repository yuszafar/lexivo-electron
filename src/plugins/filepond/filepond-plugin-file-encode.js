!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?module.exports=n():"function"==typeof define&&define.amd?define(n):(e=e||self,e.FilePondPluginFileEncode=n())}(this,function(){"use strict";var e=function(){self.onmessage=function(n){e(n.data.message,function(e){self.postMessage({id:n.data.id,message:e})})};var e=function(e,n){var t=e.file,i=new FileReader;i.onloadend=function(){n(i.result.replace("data:","").replace(/^.+,/,""))},i.readAsDataURL(t)}},n=function(n){var t=n.addFilter,i=n.utils,a=i.Type,o=i.createWorker,d=i.createRoute,r=i.isFile,f=function(n){var t=n.name,i=n.file;return new Promise(function(n){var a=o(e);a.post({file:i},function(e){n({name:t,data:e}),a.terminate()})})},u=[];return t("DID_CREATE_ITEM",function(e,n){(0,n.query)("GET_ALLOW_FILE_ENCODE")&&(e.extend("getFileEncodeBase64String",function(){return u[e.id]&&u[e.id].data}),e.extend("getFileEncodeDataURL",function(){return"data:".concat(e.fileType,";base64,").concat(u[e.id].data)}))}),t("SHOULD_PREPARE_OUTPUT",function(e,n){var t=n.query;return new Promise(function(e){e(t("GET_ALLOW_FILE_ENCODE"))})}),t("COMPLETE_PREPARE_OUTPUT",function(e,n){var t=n.item,i=n.query;return new Promise(function(n){if(!i("GET_ALLOW_FILE_ENCODE")||!r(e)&&!Array.isArray(e))return n(e);u[t.id]={metadata:t.getMetadata(),data:null},Promise.all((e instanceof Blob?[{name:null,file:e}]:e).map(f)).then(function(i){u[t.id].data=e instanceof Blob?i[0].data:i,n(e)})})}),t("CREATE_VIEW",function(e){var n=e.is,t=e.view,i=e.query;n("file-wrapper")&&i("GET_ALLOW_FILE_ENCODE")&&t.registerWriter(d({DID_PREPARE_OUTPUT:function(e){var n=e.root,t=e.action;if(!i("IS_ASYNC")){var a=i("GET_ITEM",t.id);if(a){var o=u[a.id],d=o.metadata,r=o.data,f=JSON.stringify({id:a.id,name:a.file.name,type:a.file.type,size:a.file.size,metadata:d,data:r});n.ref.data?n.ref.data.value=f:n.dispatch("DID_DEFINE_VALUE",{id:a.id,value:f})}}},DID_REMOVE_ITEM:function(e){var n=e.action,t=i("GET_ITEM",n.id);t&&delete u[t.id]}}))}),{options:{allowFileEncode:[!0,a.BOOLEAN]}}};return"undefined"!=typeof window&&void 0!==window.document&&document.dispatchEvent(new CustomEvent("FilePond:pluginloaded",{detail:n})),n})