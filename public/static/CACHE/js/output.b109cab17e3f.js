function getCookie(name){let cookieValue=null;if(document.cookie&&document.cookie!==''){const cookies=document.cookie.split(';');for(let i=0;i<cookies.length;i++){const cookie=cookies[i].trim();if(cookie.substring(0,name.length+1)===(name+'=')){cookieValue=decodeURIComponent(cookie.substring(name.length+1));break;}}}
return cookieValue;}
const loginStateCache={promise:null,value:null,initialized:true};async function isLogin(options={}){return true;}
function clearLoginStateCache(){};const messageModule=(()=>{let overlay=null;let messageBox=null;let titleElement=null;let contentElement=null;let iframeElement=null;let iframeContainer=null;let closeButton=null;let buttonContainer=null;let cancelButton=null;let confirmButton=null;let toastContainer=null;let autoCloseTimer=null;let currentCallbacks={onConfirm:null,onCancel:null};let currentTarget=null;let isPopoverMode=false;function createOverlay(){overlay=document.createElement('div');overlay.className='message-overlay';overlay.addEventListener('click',function(e){if(e.target===overlay){hide();}});document.body.appendChild(overlay);}
function createMessageBox(){messageBox=document.createElement('div');messageBox.className='message';closeButton=document.createElement('div');closeButton.className='message-close-btn';closeButton.innerHTML='✕';closeButton.addEventListener('click',hide);titleElement=document.createElement('div');titleElement.className='message-title';contentElement=document.createElement('div');contentElement.className='message-content';iframeContainer=document.createElement('div');iframeContainer.className='message-iframe-container';iframeElement=document.createElement('iframe');iframeElement.id='message-iframe';iframeElement.className='message-iframe';iframeContainer.appendChild(iframeElement);buttonContainer=document.createElement('div');buttonContainer.className='message-btn';cancelButton=document.createElement('button');cancelButton.className='btn btn-secondary message-btn-cancel';cancelButton.addEventListener('click',function(){const callback=currentCallbacks.onCancel;hide();if(callback){callback();}});confirmButton=document.createElement('button');confirmButton.className='btn btn-primary message-btn-confirm';confirmButton.addEventListener('click',function(){const callback=currentCallbacks.onConfirm;hide();if(callback){callback();}});buttonContainer.appendChild(cancelButton);buttonContainer.appendChild(confirmButton);messageBox.appendChild(closeButton);messageBox.appendChild(titleElement);messageBox.appendChild(contentElement);messageBox.appendChild(iframeContainer);messageBox.appendChild(buttonContainer);document.body.appendChild(messageBox);}
function createToastContainer(){toastContainer=document.createElement('div');toastContainer.className='toast-container toast-top';document.body.appendChild(toastContainer);}
function init(){if(!overlay)createOverlay();if(!messageBox)createMessageBox();if(!toastContainer)createToastContainer();}
function showElement(element){if(element){element.style.display='';element.classList.remove('hide');}}
function hideElement(element){if(element){element.classList.add('hide');}}
function getTargetElement(target){if(!target)return null;if(typeof target==='string'){return document.querySelector(target);}
return target;}
function calculatePosition(targetElement,position,offset){const targetRect=targetElement.getBoundingClientRect();const viewportWidth=window.innerWidth;const viewportHeight=window.innerHeight;let finalPosition=position;let top,left;if(position==='auto'){const spaceTop=targetRect.top;const spaceBottom=viewportHeight-targetRect.bottom;const spaceLeft=targetRect.left;const spaceRight=viewportWidth-targetRect.right;const maxVerticalSpace=Math.max(spaceTop,spaceBottom);const maxHorizontalSpace=Math.max(spaceLeft,spaceRight);if(maxVerticalSpace>=maxHorizontalSpace){finalPosition=spaceTop>=spaceBottom?'top':'bottom';}else{finalPosition=spaceLeft>=spaceRight?'left':'right';}}
messageBox.offsetHeight;const rect=messageBox.getBoundingClientRect();const messageWidth=rect.width;const messageHeight=rect.height;switch(finalPosition){case'top':top=targetRect.top-messageHeight-offset;left=targetRect.left+(targetRect.width-messageWidth)/2;break;case'bottom':top=targetRect.bottom+offset;left=targetRect.left+(targetRect.width-messageWidth)/2;break;case'left':top=targetRect.top+(targetRect.height-messageHeight)/2;left=targetRect.left-messageWidth-offset;break;case'right':top=targetRect.top+(targetRect.height-messageHeight)/2;left=targetRect.right+offset;break;}
const padding=10;if(left<padding){left=padding;}else if(left+messageWidth>viewportWidth-padding){left=viewportWidth-messageWidth-padding;}
if(top<padding){top=padding;}else if(top+messageHeight>viewportHeight-padding){top=viewportHeight-messageHeight-padding;}
return{top,left};}
function positionNearTarget(targetElement,position,offset){messageBox.style.transform='none';messageBox.style.margin='0';messageBox.style.position='fixed';messageBox.offsetHeight;const pos=calculatePosition(targetElement,position,offset);messageBox.style.top=pos.top+'px';messageBox.style.left=pos.left+'px';}
function show(options){init();const config=typeof options==='string'?{content:options}:(options||{});if(autoCloseTimer){clearTimeout(autoCloseTimer);autoCloseTimer=null;}
const settings={title:config.title||'',content:config.content||'',showCancel:config.showCancel===true,showClose:config.showClose!==false,confirmText:config.confirmText||'确定',cancelText:config.cancelText||'取消',onConfirm:config.onConfirm||null,onCancel:config.onCancel||null,autoClose:config.autoClose||0,isHtml:config.isHtml===true,url:config.url||'',iframeHeight:config.iframeHeight||'500px',iframeWidth:config.iframeWidth||'100%',target:config.target||null,position:config.position||'auto',offset:config.offset||10,customButtons:config.customButtons||null};currentTarget=getTargetElement(settings.target);isPopoverMode=currentTarget!==null;currentCallbacks.onConfirm=settings.onConfirm;currentCallbacks.onCancel=settings.onCancel;if(settings.title){titleElement.textContent=settings.title;showElement(titleElement);}else{hideElement(titleElement);}
if(settings.url){hideElement(contentElement);showElement(iframeContainer);iframeElement.src=settings.url;iframeElement.style.height=settings.iframeHeight;iframeElement.style.width=settings.iframeWidth;}else{hideElement(iframeContainer);showElement(contentElement);if(settings.isHtml){contentElement.innerHTML=settings.content;}else{contentElement.textContent=settings.content;}}
if(settings.showClose){showElement(closeButton);}else{hideElement(closeButton);}
if(settings.customButtons&&Array.isArray(settings.customButtons)){buttonContainer.innerHTML='';settings.customButtons.forEach(function(btnConfig){const btn=document.createElement('button');btn.textContent=btnConfig.text;btn.className='btn '+(btnConfig.class||'btn-primary');btn.addEventListener('click',function(){const callback=btnConfig.onClick;hide();if(callback){callback();}});buttonContainer.appendChild(btn);});}else{buttonContainer.innerHTML='';buttonContainer.appendChild(cancelButton);buttonContainer.appendChild(confirmButton);cancelButton.textContent=settings.cancelText;confirmButton.textContent=settings.confirmText;if(settings.showCancel){showElement(cancelButton);}else{hideElement(cancelButton);}}
if(isPopoverMode){hideElement(overlay);messageBox.classList.remove('show');messageBox.classList.add('message-popover');messageBox.style.visibility='hidden';messageBox.style.display='block';messageBox.classList.add('show');requestAnimationFrame(function(){positionNearTarget(currentTarget,settings.position,settings.offset);messageBox.style.visibility='';});}else{messageBox.classList.remove('message-popover');messageBox.style.position='';messageBox.style.top='';messageBox.style.left='';messageBox.style.transform='';messageBox.style.margin='';messageBox.style.visibility='';overlay.classList.add('show');messageBox.classList.add('show');}
if(settings.autoClose>0){autoCloseTimer=setTimeout(hide,settings.autoClose);}}
function hide(){if(autoCloseTimer){clearTimeout(autoCloseTimer);autoCloseTimer=null;}
if(overlay)overlay.classList.remove('show');if(messageBox){messageBox.classList.remove('show');messageBox.style.display='';}
if(iframeElement)iframeElement.src='';currentCallbacks={onConfirm:null,onCancel:null};}
function confirm(options){return new Promise(function(resolve){const config=typeof options==='string'?{content:options}:(options||{});show({title:config.title||'确认',content:config.content,showCancel:true,showClose:config.showClose!==false,confirmText:config.confirmText||'确定',cancelText:config.cancelText||'取消',isHtml:config.isHtml,onConfirm:function(){resolve(true);if(config.onConfirm)config.onConfirm();},onCancel:function(){resolve(false);if(config.onCancel)config.onCancel();}});});}
function toast(options){init();const config=typeof options==='string'?{content:options}:(options||{});const settings={content:config.content||'',type:config.type||'info',duration:config.duration||3000,position:config.position||'top',isHtml:config.isHtml===true};const iconMap={success:'✓',error:'✕',warning:'⚠',info:'ℹ'};const toastElement=document.createElement('div');toastElement.className='toast-message toast-'+settings.type;const iconDiv=document.createElement('div');iconDiv.className='toast-icon';iconDiv.textContent=iconMap[settings.type]||iconMap.info;const contentDiv=document.createElement('div');contentDiv.className='toast-content';if(settings.isHtml){contentDiv.innerHTML=settings.content;}else{contentDiv.textContent=settings.content;}
toastElement.appendChild(iconDiv);toastElement.appendChild(contentDiv);if(settings.position==='bottom'){toastContainer.className='toast-container toast-bottom';}else{toastContainer.className='toast-container toast-top';}
toastContainer.appendChild(toastElement);setTimeout(function(){toastElement.classList.add('show');},10);setTimeout(function(){toastElement.classList.remove('show');setTimeout(function(){if(toastElement.parentNode){toastElement.parentNode.removeChild(toastElement);}},300);},settings.duration);}
function success(options){const config=typeof options==='string'?{content:options}:(options||{});show({title:config.title||'成功',content:config.content,showCancel:config.showCancel===true,showClose:config.showClose!==false,confirmText:config.confirmText||'确定',isHtml:config.isHtml,onConfirm:config.onConfirm,onCancel:config.onCancel,autoClose:config.autoClose});}
function warning(options){const config=typeof options==='string'?{content:options}:(options||{});show({title:config.title||'警告',content:config.content,showCancel:config.showCancel===true,showClose:config.showClose!==false,confirmText:config.confirmText||'确定',cancelText:config.cancelText||'取消',isHtml:config.isHtml,onConfirm:config.onConfirm,onCancel:config.onCancel,autoClose:config.autoClose});}
function error(options){const config=typeof options==='string'?{content:options}:(options||{});show({title:config.title||'错误',content:config.content,showCancel:config.showCancel===true,showClose:config.showClose!==false,confirmText:config.confirmText||'确定',isHtml:config.isHtml,onConfirm:config.onConfirm,onCancel:config.onCancel,autoClose:config.autoClose});}
function info(options){const config=typeof options==='string'?{content:options}:(options||{});show({title:config.title||'提示',content:config.content,showCancel:config.showCancel===true,showClose:config.showClose!==false,confirmText:config.confirmText||'确定',isHtml:config.isHtml,onConfirm:config.onConfirm,onCancel:config.onCancel,autoClose:config.autoClose});}
return{show:show,hide:hide,confirm:confirm,toast:toast,success:success,warning:warning,error:error,info:info};})();;(()=>{const THEME_KEY='theme';const THEME_LIGHT='light';const THEME_DARK='dark';const themeButton=document.getElementById('theme-btn');function initTheme(){const savedTheme=localStorage.getItem(THEME_KEY);const prefersDark=window.matchMedia('(prefers-color-scheme: dark)').matches;const theme=savedTheme||(prefersDark?THEME_DARK:THEME_LIGHT);applyTheme(theme);notifyIframesAboutTheme(theme);}
function applyTheme(theme){const root=document.documentElement;root.classList.remove('light','dark');if(theme===THEME_DARK){root.classList.add('dark');}else{root.classList.add('light');}
localStorage.setItem(THEME_KEY,theme);notifyIframesAboutTheme(theme);}
function notifyIframesAboutTheme(theme){const iframes=document.querySelectorAll('iframe');iframes.forEach(iframe=>{try{if(iframe.contentWindow){iframe.contentWindow.postMessage({type:'THEME_CHANGE',theme:theme,timestamp:Date.now()},'*');}}catch(error){console.warn('无法向iframe发送主题消息:',error);fallbackToURLTheme(iframe,theme);}});}
function fallbackToURLTheme(iframe,theme){try{const currentSrc=iframe.src.split('?')[0];iframe.src=`${currentSrc}?theme=${theme}&t=${Date.now()}`;}catch(error){console.error('URL主题设置也失败:',error);}}
function toggleTheme(){const root=document.documentElement;const isDark=root.classList.contains('dark');const newTheme=isDark?THEME_LIGHT:THEME_DARK;applyTheme(newTheme);root.style.transition='background-color 0.3s ease, color 0.3s ease';setTimeout(()=>{root.style.transition='';},300);}
function setupIframeListeners(){document.addEventListener('DOMContentLoaded',function(){const iframes=document.querySelectorAll('iframe');iframes.forEach(iframe=>{iframe.addEventListener('load',function(){const currentTheme=localStorage.getItem(THEME_KEY)||THEME_DARK;setTimeout(()=>{notifyIframesAboutTheme(currentTheme);},100);});});});}
function watchSystemTheme(){const mediaQuery=window.matchMedia('(prefers-color-scheme: dark)');mediaQuery.addEventListener('change',(e)=>{const savedTheme=localStorage.getItem(THEME_KEY);if(!savedTheme){const theme=e.matches?THEME_DARK:THEME_LIGHT;applyTheme(theme);}});}
function setupMessageListener(){window.addEventListener('message',function(event){const data=event.data;if(data&&data.type==='THEME_REQUEST'){const currentTheme=localStorage.getItem(THEME_KEY)||THEME_DARK;const sourceWindow=getIframeSourceWindow(event.source);if(sourceWindow){sourceWindow.postMessage({type:'THEME_RESPONSE',theme:currentTheme,timestamp:Date.now()},event.origin);}}});}
function getIframeSourceWindow(source){if(!source){return null;}
const iframes=document.querySelectorAll('iframe');for(const iframe of iframes){if(iframe.contentWindow===source){return iframe.contentWindow;}}
return null;}
function bindEvents(){if(themeButton){themeButton.addEventListener('click',toggleTheme);}}
function init(){initTheme();bindEvents();watchSystemTheme();setupIframeListeners();setupMessageListener();}
if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',init);}else{init();}})();;(()=>{let announcementCount=0;let allAnnouncements=[];let currentAnnouncementIndex=0;let isCurrentUserLoggedIn=false;let noticeContainer;let noticeOverlay;let noticeCloseBtn;let announcementTitle;let announcementStatus;let announcementTime;let announcementContent;let announcementIndicators;let prevButton;let nextButton;document.addEventListener('DOMContentLoaded',init);async function init(){createNoticeContainer();initDOMElements();bindEvents();isCurrentUserLoggedIn=await isLogin();await startNotifications();}
function createNoticeContainer(){if(document.getElementById('notice-container')){return;}
const noticeHTML=`
            <div class="notice-container" id="notice-container">
                <div class="notice-overlay" id="notice-overlay"></div>
                <div class="notice-content">
                    <div class="notice-header">
                        <h2 class="notice-title">公告</h2>
                        <div class="notice-close-btn" id="notice-close-btn">✕</div>
                    </div>
                    <!-- 公告展示区域 -->
                    <div class="announcement-display">
                        <!-- 标题区域 -->
                        <div class="announcement-header">
                            <h3 id="announcement-title">加载中...</h3>
                            <div class="announcement-meta">
                                <span id="announcement-status" class="status-badge">未读</span>
                                <span id="announcement-time" class="time-badge">发布时间：--</span>
                            </div>
                        </div>
                        <!-- 正文区域 -->
                        <div id="announcement-content" class="announcement-content">
                            加载中...
                        </div>
                        <!-- 指示器和按钮区域 -->
                        <div class="announcement-controls">
                            <!-- 公告数量指示器 -->
                            <div id="announcement-indicators" class="announcement-indicators">
                                <!-- 指示点将通过JS动态生成 -->
                            </div>
                            <!-- 导航按钮 -->
                            <div class="announcement-nav-buttons">
                                <button id="prev-announcement" class="nav-button">上一条</button>
                                <button id="next-announcement" class="nav-button">下一条</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;document.body.insertAdjacentHTML('beforeend',noticeHTML);}
function initDOMElements(){noticeContainer=document.getElementById('notice-container');noticeOverlay=document.getElementById('notice-overlay');noticeCloseBtn=document.getElementById('notice-close-btn');announcementTitle=document.getElementById('announcement-title');announcementStatus=document.getElementById('announcement-status');announcementTime=document.getElementById('announcement-time');announcementContent=document.getElementById('announcement-content');announcementIndicators=document.getElementById('announcement-indicators');prevButton=document.getElementById('prev-announcement');nextButton=document.getElementById('next-announcement');}
function bindEvents(){document.getElementById('notice-btn').addEventListener('click',showAnnouncementsWindow);if(noticeCloseBtn){noticeCloseBtn.addEventListener('click',closeAnnouncementsWindow);}
if(noticeOverlay){noticeOverlay.addEventListener('click',closeAnnouncementsWindow);}
if(prevButton){prevButton.addEventListener('click',async()=>{if(currentAnnouncementIndex>0){await displayAnnouncement(currentAnnouncementIndex-1,isCurrentUserLoggedIn);}});}
if(nextButton){nextButton.addEventListener('click',async()=>{if(currentAnnouncementIndex<allAnnouncements.length-1){await displayAnnouncement(currentAnnouncementIndex+1,isCurrentUserLoggedIn);}});}}
async function startNotifications(){}
async function getNotifications(){return{has_unread:false,unread_count:0};}function updateBadge(count){const badge=document.getElementById('badge');if(badge&&count>0){badge.classList.add('show');badge.textContent=String(count);}}
async function showAnnouncementsWindow(){if(noticeContainer){noticeContainer.classList.add('show');}
await loadAnnouncementData();}
function closeAnnouncementsWindow(){if(noticeContainer){noticeContainer.classList.remove('show');}}
async function loadAnnouncementData(){try{if(announcementContent){announcementContent.innerHTML='<div class="loading-message">加载中...</div>';}
const response=await fetch('/notice/api/announcements/');const data=await response.json();if(data.success&&data['announcements'].length>0){allAnnouncements=data['announcements'];createAnnouncementIndicators(allAnnouncements.length);await displayAnnouncement(0,isCurrentUserLoggedIn);}else{if(announcementContent){announcementContent.innerHTML='<div class="error-message">暂无公告</div>';}}}catch(error){messageModule.error({content:`加载公告失败:${error}`,});if(announcementContent){announcementContent.innerHTML='<div class="error-message">加载失败，请稍后重试</div>';}}}
function createAnnouncementIndicators(count){if(!announcementIndicators)return;announcementIndicators.innerHTML='';for(let i=0;i<count;i++){const dot=document.createElement('div');dot.className='indicator-dot';dot.setAttribute('data-index',String(i));dot.addEventListener('click',async function(){const index=parseInt(this.getAttribute('data-index'));await displayAnnouncement(index,isCurrentUserLoggedIn);});announcementIndicators.appendChild(dot);}
if(count>0){announcementIndicators.children[0].classList.add('active');}}
async function displayAnnouncement(index,isLoggedIn=false){if(index<0||index>=allAnnouncements.length){return;}
const announcement=allAnnouncements[index];currentAnnouncementIndex=index;if(announcementTitle){announcementTitle.textContent=announcement.title;}
if(announcementStatus){if(announcement.is_read){announcementStatus.textContent='已读';announcementStatus.classList.add('read');}else{announcementStatus.textContent='未读';announcementStatus.classList.remove('read');}}
if(announcementTime){announcementTime.textContent=`发布时间：${announcement['publish_time']}`;}
if(announcementContent&&typeof marked!=='undefined'){announcementContent.innerHTML=marked.parse(announcement.content);}else if(announcementContent){announcementContent.textContent=announcement.content;}
if(!announcement.is_read&&isLoggedIn){await markAnnouncementAsRead(announcement.id);}
updateIndicators(index);updateNavigationButtons();}
function updateIndicators(activeIndex){if(!announcementIndicators)return;const dots=announcementIndicators.querySelectorAll('.indicator-dot');dots.forEach((dot,index)=>{if(index===activeIndex){dot.classList.add('active');}else{dot.classList.remove('active');}});}
function updateNavigationButtons(){if(prevButton){prevButton.disabled=currentAnnouncementIndex<=0;}
if(nextButton){nextButton.disabled=currentAnnouncementIndex>=allAnnouncements.length-1;}}
async function markAnnouncementAsRead(announcementId){try{const response=await fetch('/notice/api/mark-announcement-read/',{method:'POST',headers:{'Content-Type':'application/json','X-CSRFToken':getCookie('csrftoken')},body:JSON.stringify({announcement_id:announcementId}),credentials:'same-origin'});const data=await response.json();if(data.success){updateAnnouncementReadStatus(announcementId);await startNotifications();}}catch(error){console.error('标记公告已读失败:',error);}}
function updateAnnouncementReadStatus(announcementId){for(let i=0;i<allAnnouncements.length;i++){if(allAnnouncements[i].id===announcementId){allAnnouncements[i].is_read=true;break;}}}})();;(()=>{const DRAWER_MENU_TIP_KEY='drawer_menu_tip_seen';const DRAWER_MENU_TIP_VERSION='2026-05-drawer-menu-v1';const DESKTOP_MEDIA_QUERY='(min-width: 769px)';const DRAWER_MENU_TIP_DELAY=1000;document.addEventListener('DOMContentLoaded',initMenu);async function initMenu(){const isLoggedIn=await isLogin();document.getElementById(isLoggedIn?'login-menu':'logout-menu').classList.add('show');setupOverlayClickListener();setupEscCloseListener();bindMenuArea();setupDrawerMenuTip();if(isLoggedIn){document.querySelector('#login-menu .user-name')?.addEventListener('click',toggleLoginMenu);}}
function toggleLoginMenu(event){if(event){event.stopPropagation();}
const loginDropdownContent=document.getElementById('login-dropdown-content');if(!loginDropdownContent){return;}
if(loginDropdownContent.classList.contains('show')){closeAllDrawers();return;}
openDrawer('user');}
function bindMenuArea(){const logo=document.getElementById('logo');if(logo){logo.addEventListener('click',toggleMenuArea);}}
function toggleMenuArea(event){if(event){event.stopPropagation();}
const menuArea=document.getElementById('menu-area');if(!menuArea){return;}
if(menuArea.classList.contains('show')){closeAllDrawers();return;}
openDrawer('menu');}
function openDrawer(type){const menuArea=document.getElementById('menu-area');const loginDropdownContent=document.getElementById('login-dropdown-content');const overlay=document.getElementById('dropdown-overlay');if(!overlay){return;}
menuArea?.classList.toggle('show',type==='menu');loginDropdownContent?.classList.toggle('show',type==='user');overlay.classList.add('show');document.body.classList.add('drawer-open');document.body.classList.toggle('drawer-menu-open',type==='menu');document.body.classList.toggle('drawer-user-open',type==='user');if(type==='menu'){markDrawerMenuTipSeen();}}
function closeAllDrawers(){const overlay=document.getElementById('dropdown-overlay');document.getElementById('login-dropdown-content')?.classList.remove('show');document.getElementById('menu-area')?.classList.remove('show');overlay?.classList.remove('show');document.body.classList.remove('drawer-open','drawer-menu-open','drawer-user-open');}
function setupOverlayClickListener(){const overlay=document.getElementById('dropdown-overlay');if(overlay){overlay.addEventListener('click',closeAllDrawers);}}
function setupEscCloseListener(){document.addEventListener('keydown',(event)=>{if(event.key==='Escape'){closeAllDrawers();}});}
function setupDrawerMenuTip(){const tip=document.getElementById('drawer-menu-tip');const dismissBtn=document.getElementById('drawer-menu-tip-dismiss');if(!tip||!shouldShowDrawerMenuTip()){return;}
dismissBtn?.addEventListener('click',(event)=>{event.stopPropagation();markDrawerMenuTipSeen();});window.setTimeout(()=>{if(shouldShowDrawerMenuTip()){showDrawerMenuTip();}},DRAWER_MENU_TIP_DELAY);}
function shouldShowDrawerMenuTip(){return window.matchMedia(DESKTOP_MEDIA_QUERY).matches&&localStorage.getItem(DRAWER_MENU_TIP_KEY)!==DRAWER_MENU_TIP_VERSION;}
function showDrawerMenuTip(){const tip=document.getElementById('drawer-menu-tip');if(!tip){return;}
tip.classList.add('show');tip.setAttribute('aria-hidden','false');}
function hideDrawerMenuTip(){const tip=document.getElementById('drawer-menu-tip');if(!tip){return;}
tip.classList.remove('show');tip.setAttribute('aria-hidden','true');}
function markDrawerMenuTipSeen(){localStorage.setItem(DRAWER_MENU_TIP_KEY,DRAWER_MENU_TIP_VERSION);hideDrawerMenuTip();}})();;(()=>{document.addEventListener('DOMContentLoaded',init)
async function init(){if(await isLogin()){try{const data=await getUserInfo();updateUserInfo(data);const inviteCode=data.invite_code;if(inviteCode){document.getElementById('invite-code').addEventListener('click',()=>{copyToClipboard(`https://${window.location.host}/account/register/?invite_code=${inviteCode}`);})}}catch(error){console.error('获取用户信息失败:',error);}}}
async function getUserInfo(){const response=await fetch('/account/api/user_info/',{cache:'no-store',credentials:'same-origin'});return await response.json();}
function updateUserInfo(data){const usernameEl=document.getElementById('username');const balanceEl=document.getElementById('user-balance');const inviteCodeEl=document.getElementById('invite-code');const invitedByEl=document.getElementById('invited-by');if(usernameEl){usernameEl.innerText=data.username;}
if(balanceEl){balanceEl.textContent=`积分：${data.balance}`;}
if(inviteCodeEl){inviteCodeEl.textContent=`邀请码：${data.invite_code}`;}
if(invitedByEl){if(data.invited_by){invitedByEl.textContent=`邀请人：${data.invited_by}`;invitedByEl.style.display='';}}}
function copyToClipboard(text){if(navigator.clipboard){navigator.clipboard.writeText(text).then(()=>{messageModule.toast({content:'邀请注册链接已复制到剪贴板'});}).catch(error=>{messageModule.error({content:`复制失败:${error}`});});}else{const textarea=document.createElement('textarea');textarea.value=text;textarea.style.position='fixed';document.body.appendChild(textarea);textarea.focus();textarea.select();try{const successful=document.execCommand('copy');if(successful){messageModule.toast({content:'邀请注册链接已自动复制到剪贴板'});}else{messageModule.error({content:`自动复制失败! 请手动复制分享链接:${text}`});}}catch(error){messageModule.error({content:`自动复制失败! 请手动复制分享链接:${error}`});}
document.body.removeChild(textarea);}}})();;const captchaModule=(()=>{'use strict';let captchaKey=null;let currentObjectUrl=null;async function generateCaptcha(imgElementId='captcha-img'){try{const timestamp=Date.now();const response=await fetch(`/account/api/captcha/?t=${timestamp}`,{method:'GET',credentials:'same-origin'});if(!response.ok){console.error('生成验证码失败: 获取验证码失败');return null;}
captchaKey=response.headers.get('X-Captcha-Key');if(currentObjectUrl){URL.revokeObjectURL(currentObjectUrl);currentObjectUrl=null;}
const blob=await response.blob();currentObjectUrl=URL.createObjectURL(blob);const imgElement=document.getElementById(imgElementId);if(imgElement){imgElement.src=currentObjectUrl;}
return captchaKey;}catch(error){console.error('生成验证码失败:',error);return null;}}
async function refreshCaptcha(imgElementId='captcha-img'){const captchaValue=await generateCaptcha(imgElementId);if(!captchaValue){messageModule.error({content:'刷新验证码失败'});}}
function getCaptchaKey(){return captchaKey;}
function verifyCaptcha(code){if(!code||code.trim().length===0){messageModule.toast({content:'请输入图形验证码'});return false;}
if(!captchaKey){messageModule.error({content:'验证码未初始化，请刷新页面重试'});return false;}
return true;}
return{generateCaptcha,refreshCaptcha,getCaptchaKey,verifyCaptcha,};})();;const loginModule=(()=>{'use strict';document.addEventListener('DOMContentLoaded',init);let currentLoginType='password';let loginEventsBound=false;function init(){const loginBtn=document.getElementById('login-btn');if(loginBtn){loginBtn.addEventListener('click',showLoginBox);}}
function createLoginContainer(){if(document.getElementById('login-box')){return;}
const csrfToken=getCookie('csrftoken')||'';const loginHTML=`
            <div class="login-box" id="login-box">
                <div class="login-close-btn" id="login-close-btn">✕</div>
                <h1 class="auth-title">登录</h1>
                <!-- Tab切换 -->
                <div class="login-tabs">
                    <div class="login-tab active" data-tab="password" id="tab-password">密码登录</div>
                    <div class="login-tab" data-tab="sms" id="tab-sms">手机登录</div>
                </div>
                <div class="login-container">
                    <div class="login-form-track">
                    <!-- 密码登录表单 -->
                    <form method="post" action="" class="login-form active" id="passwordLoginForm" aria-hidden="false">
                        <input type="hidden" name="csrfmiddlewaretoken" id="csrf-token-input-password" value="${csrfToken}">
                        <div class="form-group">
                            <label for="id_username_password">手机号/邮箱</label>
                            <input type="text" id="id_username_password" name="username" placeholder="手机号/邮箱" class="form-control" required>
                        </div>
                        <div class="form-group">
                            <label for="id_password">密码</label>
                            <div class="password-input-wrapper">
                                <input type="password" id="id_password" name="password" placeholder="密码" class="form-control" required>
                                <button type="button" class="password-toggle-btn" id="password-toggle-btn" aria-label="显示/隐藏密码">
                                    <svg class="eye-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                        <circle cx="12" cy="12" r="3"></circle>
                                    </svg>
                                    <svg class="eye-off-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display: none;">
                                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                                        <line x1="1" y1="1" x2="23" y2="23"></line>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div class="form-options">
                            <label class="remember-me">
                                <input type="checkbox" id="id_remember" name="remember" class="form-check-input" checked>
                                <span>记住我</span>
                            </label>
                            <a href="/account/password/reset/" class="forgot-password">忘记密码？</a>
                        </div>
                        <div class="agreement-checkbox">
                            <input type="checkbox" id="agree-checkbox-password" required>
                            <label for="agree-checkbox-password">我已阅读并同意
                                <a id="user-agreement">《用户协议》</a>
                                和
                                <a id="privacy-policy">《隐私政策》</a></label>
                        </div>
                        <div class="btn" id="login-password">登录</div>
                    </form>
                    <!-- 验证码登录表单 -->
                    <form method="post" action="" class="login-form" id="smsLoginForm" aria-hidden="true">
                        <input type="hidden" name="csrfmiddlewaretoken" id="csrf-token-input-sms" value="${csrfToken}">
                        <div class="form-group">
                            <label for="id_phone_sms">手机号</label>
                            <input type="tel" id="id_phone_sms" name="phone_number" placeholder="手机号" class="form-control" required>
                        </div>
                        <div class="form-group">
                            <label>图形验证码</label>
                            <div class="captcha-container">
                                <input type="text" id="id_captcha_code" placeholder="输入验证码" class="captcha-input" maxlength="4">
                                <div class="captcha-wrapper">
                                    <img id="captcha-img" class="captcha-img" alt="验证码">
                                    <button type="button" class="captcha-refresh" id="captcha-refresh" title="刷新验证码">↻</button>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="id_sms_code">短信验证码</label>
                            <div class="sms-input-wrapper">
                                <input type="text" id="id_sms_code" name="sms_code" placeholder="短信验证码" class="form-control" required>
                                <button type="button" class="send-sms-btn" id="send-sms-btn">获取验证码</button>
                            </div>
                        </div>
                        <div class="form-options">
                            <label class="remember-me">
                                <input type="checkbox" id="id_remember_sms" name="remember" class="form-check-input" checked>
                                <span>记住我</span>
                            </label>
                        </div>
                        <div class="agreement-checkbox">
                            <input type="checkbox" id="agree-checkbox-sms" required>
                            <label for="agree-checkbox-sms">我已阅读并同意
                                <a id="user-agreement-sms">《用户协议》</a>
                                和
                                <a id="privacy-policy-sms">《隐私政策》</a></label>
                        </div>
                        <div class="form-group">
                            <label>提示：未注册用户将自动注册</label>
                        </div>
                        <div class="btn" id="login-sms">登录</div>
                    </form>
                    </div>
                </div>
                <div class="register-hint">
                    <a href="/account/register/" class="register-link">使用邮箱注册</a>
                </div>
            </div>
        `;document.body.insertAdjacentHTML('beforeend',loginHTML);setFormInteractive(document.getElementById('passwordLoginForm'),true);setFormInteractive(document.getElementById('smsLoginForm'),false);}
function bindLoginEvents(){if(loginEventsBound){return;}
const userAgreementBtn=document.getElementById('user-agreement');const privacyPolicyBtn=document.getElementById('privacy-policy');const userAgreementBtnSms=document.getElementById('user-agreement-sms');const privacyPolicyBtnSms=document.getElementById('privacy-policy-sms');const loginCloseBtn=document.getElementById('login-close-btn');const loginSubmitBtnPassword=document.getElementById('login-password');const loginSubmitBtnSms=document.getElementById('login-sms');const passwordToggleBtn=document.getElementById('password-toggle-btn');const sendSmsBtn=document.getElementById('send-sms-btn');const tabPassword=document.getElementById('tab-password');const tabSms=document.getElementById('tab-sms');const captchaRefreshBtn=document.getElementById('captcha-refresh');const captchaImg=document.getElementById('captcha-img');if(userAgreementBtn){userAgreementBtn.addEventListener('click',getUserAgreement);}
if(privacyPolicyBtn){privacyPolicyBtn.addEventListener('click',getPrivacyPolicy);}
if(userAgreementBtnSms){userAgreementBtnSms.addEventListener('click',getUserAgreement);}
if(privacyPolicyBtnSms){privacyPolicyBtnSms.addEventListener('click',getPrivacyPolicy);}
if(loginCloseBtn){loginCloseBtn.addEventListener('click',closeLoginBox);}
if(loginSubmitBtnPassword){loginSubmitBtnPassword.addEventListener('click',()=>startLogin('password'));}
if(loginSubmitBtnSms){loginSubmitBtnSms.addEventListener('click',()=>startLogin('sms'));}
if(passwordToggleBtn){passwordToggleBtn.addEventListener('click',togglePasswordVisibility);}
if(sendSmsBtn){sendSmsBtn.addEventListener('click',sendSmsCode);}
if(tabPassword){tabPassword.addEventListener('click',()=>switchTab('password'));}
if(tabSms){tabSms.addEventListener('click',()=>switchTab('sms'));}
if(captchaRefreshBtn){captchaRefreshBtn.addEventListener('click',()=>{captchaModule.refreshCaptcha('captcha-img');});}
if(captchaImg){captchaImg.addEventListener('click',()=>{captchaModule.refreshCaptcha('captcha-img');});}
loginEventsBound=true;}
function switchTab(tabType){if(currentLoginType===tabType){return;}
currentLoginType=tabType;const loginBox=document.getElementById('login-box');const tabPassword=document.getElementById('tab-password');const tabSms=document.getElementById('tab-sms');const passwordForm=document.getElementById('passwordLoginForm');const smsForm=document.getElementById('smsLoginForm');const isPasswordLogin=tabType==='password';loginBox?.classList.toggle('is-sms-login',!isPasswordLogin);tabPassword?.classList.toggle('active',isPasswordLogin);tabSms?.classList.toggle('active',!isPasswordLogin);passwordForm?.classList.toggle('active',isPasswordLogin);smsForm?.classList.toggle('active',!isPasswordLogin);setFormInteractive(passwordForm,isPasswordLogin);setFormInteractive(smsForm,!isPasswordLogin);}
function setFormInteractive(form,isActive){if(!form){return;}
form.setAttribute('aria-hidden',String(!isActive));form.querySelectorAll('input, button, select, textarea, a, [tabindex]').forEach(element=>{if(isActive){if(element.dataset.previousTabindex!==undefined){element.setAttribute('tabindex',element.dataset.previousTabindex);delete element.dataset.previousTabindex;}else{element.removeAttribute('tabindex');}}else{if(element.hasAttribute('tabindex')){element.dataset.previousTabindex=element.getAttribute('tabindex');}
element.setAttribute('tabindex','-1');}});}
function togglePasswordVisibility(){const passwordInput=document.getElementById('id_password');const toggleBtn=document.getElementById('password-toggle-btn');const eyeIcon=toggleBtn.querySelector('.eye-icon');const eyeOffIcon=toggleBtn.querySelector('.eye-off-icon');if(passwordInput.type==='password'){passwordInput.type='text';eyeIcon.style.display='none';eyeOffIcon.style.display='block';}else{passwordInput.type='password';eyeIcon.style.display='block';eyeOffIcon.style.display='none';}}
async function sendSmsCode(){const phoneInput=document.getElementById('id_phone_sms');const captchaInput=document.getElementById('id_captcha_code');const phoneNumber=phoneInput.value.trim();const captchaCode=captchaInput.value.trim();if(!phoneNumber){messageModule.toast({content:'请输入手机号'});return;}
if(!/^1[3-9]\d{9}$/.test(phoneNumber)){messageModule.toast({content:'请输入正确的手机号'});return;}
if(!captchaModule.verifyCaptcha(captchaCode)){await captchaModule.refreshCaptcha('captcha-img');captchaInput.value='';return;}
const sendBtn=document.getElementById('send-sms-btn');sendBtn.disabled=true;sendBtn.textContent='发送中...';try{const captchaKey=captchaModule.getCaptchaKey();const response=await fetch('/account/api/send-sms-code/',{method:'POST',headers:{'Content-Type':'application/json','X-CSRFToken':getCookie('csrftoken')},body:JSON.stringify({phone_number:phoneNumber,captcha_key:captchaKey,captcha_code:captchaCode}),credentials:'same-origin'});const result=await response.json();if(result.success){messageModule.toast({content:'验证码已发送，20分钟内有效'});startCountdown(sendBtn,20*60);}else{messageModule.error({content:result.message||'发送失败'});sendBtn.disabled=false;sendBtn.textContent='获取验证码';await captchaModule.refreshCaptcha('captcha-img');captchaInput.value='';}}catch(error){console.error('发送验证码失败:',error);messageModule.error({content:'网络错误，请稍后重试'});sendBtn.disabled=false;sendBtn.textContent='获取验证码';await captchaModule.refreshCaptcha('captcha-img');captchaInput.value='';}}
function startCountdown(button,seconds=60){let countdown=seconds;button.disabled=true;button.textContent=`${Math.floor(countdown / 60)}分${countdown % 60}秒后重发`;const timer=setInterval(()=>{countdown--;if(countdown<=0){clearInterval(timer);button.disabled=false;button.textContent='获取验证码';}else{button.textContent=`${Math.floor(countdown / 60)}分${countdown % 60}秒后重发`;}},1000);}
async function ensureCsrfToken(){if(getCookie('csrftoken')){return true;}
let attempts=0;const maxAttempts=5;while(attempts<maxAttempts){try{await fetch('/account/api/is_login/',{method:'GET',credentials:'same-origin'});await new Promise(resolve=>setTimeout(resolve,500));if(getCookie('csrftoken')){return true;}}catch(e){console.warn(`CSRF token 获取尝试 ${attempts + 1} 失败:`,e);}
attempts++;}
return false;}
async function showLoginBox(){createLoginContainer();const hasCsrfToken=await ensureCsrfToken();if(!hasCsrfToken){console.warn('无法获取CSRF token，登录可能会失败');}
const csrfInputPassword=document.getElementById('csrf-token-input-password');const csrfInputSms=document.getElementById('csrf-token-input-sms');if(csrfInputPassword){csrfInputPassword.value=getCookie('csrftoken')||'';}
if(csrfInputSms){csrfInputSms.value=getCookie('csrftoken')||'';}
bindLoginEvents();try{await captchaModule.generateCaptcha('captcha-img');}catch(error){console.error('生成图形验证码失败:',error);}
const loginBox=document.getElementById('login-box');loginBox.classList.add('show');}
function closeLoginBox(){const loginBox=document.getElementById('login-box');loginBox.classList.remove('show');}
async function startLogin(loginType){currentLoginType=loginType;disableLoginButton();try{const loginData=prepareLoginData(loginType);const response=await sendLoginRequest(loginData);await handleLoginResponse(response);}catch(error){messageModule.error({content:error});}finally{enableLoginButton();}}
function prepareLoginData(loginType){const remember=document.getElementById(loginType==='password'?'id_remember':'id_remember_sms');if(loginType==='password'){const username=document.getElementById('id_username_password').value.trim();const password=document.getElementById('id_password').value;return{login_type:'password',username:username,password:password,remember:remember?remember.checked:false};}else{const phone_number=document.getElementById('id_phone_sms').value.trim();const sms_code=document.getElementById('id_sms_code').value.trim();return{login_type:'sms',phone_number:phone_number,sms_code:sms_code,remember:remember?remember.checked:false};}}
async function sendLoginRequest(loginData){if(!validateLoginForm(loginData)){enableLoginButton();return new Response(JSON.stringify({success:false,message:'验证失败'}),{status:400,headers:{'Content-Type':'application/json'}});}
return await fetch('/account/login/',{method:'POST',headers:{'Content-Type':'application/json','X-CSRFToken':getCookie('csrftoken')},body:JSON.stringify(loginData),credentials:'same-origin'});}
function validateLoginForm(loginData){const loginType=loginData.login_type;if(loginType==='password'){if(!loginData.username){messageModule.toast({content:'请输入手机号或邮箱'});return false;}
if(!loginData.password){messageModule.toast({content:'请输入密码'});return false;}
const agreeCheckbox=document.getElementById('agree-checkbox-password');if(agreeCheckbox&&!agreeCheckbox.checked){messageModule.toast({content:'请阅读并同意用户协议和隐私政策'})
return false;}}else{if(!loginData.phone_number){messageModule.toast({content:'请输入手机号'});return false;}
if(!loginData.sms_code){messageModule.toast({content:'请输入验证码'});return false;}
const agreeCheckbox=document.getElementById('agree-checkbox-sms');if(agreeCheckbox&&!agreeCheckbox.checked){messageModule.toast({content:'请阅读并同意用户协议和隐私政策'})
return false;}}
const csrftoken=getCookie('csrftoken');if(!csrftoken){messageModule.toast({content:'无法获取CSRF令牌，请刷新页面重试'})
enableLoginButton();return false;}
return true;}
async function handleLoginResponse(response){const result=await response.json();if(response.ok){if(result.success){const userName=result.username;messageModule.toast({content:`登录成功！欢迎您 ${userName}`})
clearLoginStateCache();if(result['has_password']===false){showSetPasswordPrompt();}else{window.location.assign(result['redirect_url']||window.location.href);}}else{let errorMsg=result.message;if(result['suggestion']){errorMsg+='\n\n'+result['suggestion'];}
errorMsg=marked.parse(errorMsg);messageModule.error({content:errorMsg,isHtml:true})}}else{let errorMsg=result.message||'登录失败';if(result['suggestion']){errorMsg+='\n\n'+result['suggestion'];}
errorMsg=marked.parse(errorMsg);messageModule.error({content:errorMsg,isHtml:true})
if(result['error_type']==='account_not_active'){showResendActivationOption();}}}
function showSetPasswordPrompt(){closeLoginBox();messageModule.warning({title:'设置登录密码',content:'您尚未设置登录密码，建议设置密码以便使用密码登录。',showCancel:true,confirmText:'去设置',cancelText:'稍后再说',onConfirm:function(){window.location.href='/account/personal_center/?tab=personal-information';},onCancel:function(){window.location.reload();}});}
function showResendActivationOption(){const username=document.getElementById('id_username_password').value.trim();messageModule.warning({title:'账号未激活',content:'您的账号尚未激活。是否需要重新发送激活邮件？',showCancel:true,confirmText:'重发邮件',cancelText:'取消',onConfirm:function(){resendActivationEmail(username);}});}
async function resendActivationEmail(username){try{const response=await fetch('/account/api/resend-activation/',{method:'POST',headers:{'Content-Type':'application/json','X-CSRFToken':getCookie('csrftoken')},body:JSON.stringify({username:username}),credentials:'same-origin'});const result=await response.json();if(result.success){messageModule.success({content:'激活邮件已重新发送，请检查您的邮箱（包括垃圾邮件文件夹）'});}else{messageModule.error({content:result.message||'发送失败，请稍后重试'});}}catch(error){console.error('重发激活邮件失败:',error);messageModule.error({content:'网络错误，请稍后重试'});}}
function getUserAgreement(){fetch('/account/api/agreement/').then(response=>response.json()).then(data=>{const title='用户协议';const content=data['user_agreement'];messageModule.show({title:title,content:content,isHtml:true})}).catch(error=>{messageModule.error({content:`获取用户协议失败:${error}`});});}
function getPrivacyPolicy(){fetch('/account/api/agreement/').then(response=>response.json()).then(data=>{const title='隐私政策';const content=data['privacy_policy'];messageModule.show({title:title,content:content,isHtml:true})}).catch(error=>{messageModule.error({content:`获取隐私政策失败: ${error}`});});}
function disableLoginButton(){const submitButtonId=currentLoginType==='sms'?'login-sms':'login-password';const loginButton=document.getElementById(submitButtonId);if(loginButton){loginButton.disabled=true;loginButton.classList.add('disabled');loginButton.textContent='登录中...';}}
function enableLoginButton(){const submitButtonId=currentLoginType==='sms'?'login-sms':'login-password';const loginButton=document.getElementById(submitButtonId);if(loginButton){loginButton.disabled=false;loginButton.classList.remove('disabled');loginButton.textContent='登录';}}
return{showLoginBox:showLoginBox,};})();;(()=>{document.addEventListener('DOMContentLoaded',init);function init(){const logoutBtn=document.getElementById('logout');if(logoutBtn){logoutBtn.addEventListener('click',startLogout);}}
async function startLogout(){const confirmed=await messageModule.confirm({content:'确定要退出登录吗?'});if(!confirmed){return;}
if(typeof WebSocketMessage!=='undefined'){WebSocketMessage.disable();}
try{const data=await submitLogout();if(data.success){messageModule.toast({content:'退出登录成功',type:'success',duration:1500});window.location.href='/';}else{messageModule.error({content:data.message||'退出登录失败',});}}catch(error){messageModule.error({content:`退出登录时发生错误，请稍后重试`,});}}
async function submitLogout(){const csrfToken=getCookie('csrftoken');const response=await fetch('/account/logout/',{method:'POST',headers:{'X-Requested-With':'XMLHttpRequest','Content-Type':'application/json','X-CSRFToken':csrfToken},credentials:'same-origin'});if(!response.ok){messageModule.error({content:`网络错误! 状态码: ${response.status}`});return{success:false,message:`网络错误，状态码: ${response.status}`};}
return response.json();}})();;(()=>{document.addEventListener('DOMContentLoaded',init);let notificationPermissionEventsBound=false;let notificationPermissionRequestInFlight=false;let notificationPermissionTriggerHandler=null;const NOTIFIED_MESSAGE_IDS_KEY='lingyao_notified_private_message_ids';const NOTIFICATION_PERMISSION_HINT_KEY='lingyao_notification_permission_hint_shown';const NOTIFICATION_PERMISSION_PROMPT_KEY='lingyao_notification_permission_prompt_shown';async function init(){if(await isLogin()){bindNotificationPermissionRequest();showNotificationPermissionPrompt();clearNotifiedMessageIds();try{await syncUnreadMessagesState();}catch(error){}
initWebSocket();}}
async function requestNotificationPermission(){return'denied';}
function bindNotificationPermissionRequest(){if(notificationPermissionEventsBound||!('Notification'in window)){return;}
if(Notification.permission!=='default'){return;}
notificationPermissionTriggerHandler=async()=>{if(notificationPermissionRequestInFlight){return;}
notificationPermissionRequestInFlight=true;const permission=await requestNotificationPermission();if(permission==='granted'){showNotificationPermissionGranted();await syncUnreadMessagesState();}else if(permission==='denied'){showNotificationPermissionHint();}
unbindNotificationPermissionRequest();notificationPermissionRequestInFlight=false;};['click','touchstart','keydown'].forEach((eventName)=>{document.addEventListener(eventName,notificationPermissionTriggerHandler,{passive:true});});notificationPermissionEventsBound=true;}
function unbindNotificationPermissionRequest(){if(notificationPermissionTriggerHandler){['click','touchstart','keydown'].forEach((eventName)=>{document.removeEventListener(eventName,notificationPermissionTriggerHandler,{passive:true});});notificationPermissionTriggerHandler=null;}
notificationPermissionEventsBound=false;}
function showNotificationPermissionPrompt(){}function showNotificationPermissionGranted(){if(typeof messageModule!=='undefined'&&messageModule.success){messageModule.success({content:'通知权限已开启，后续可正常接收私信与推送提醒。',duration:3000,});}}
function initWebSocket(){if(typeof WebSocketMessage!=='undefined'){WebSocketMessage.onUnreadCountUpdate((count)=>{updateMessageBadge(count);if(count===0){clearNotifiedMessageIds();}});WebSocketMessage.onNewMessage((message)=>{if(message['is_admin']){incrementBadge();showNotification(message).then((shown)=>{if(shown){rememberNotifiedMessageId(message.id);}});}});WebSocketMessage.enable();WebSocketMessage.connect();}}
async function getMessage(){const response=await fetch('/notice/get-unread-messages/',{method:'GET',headers:{'X-Requested-With':'XMLHttpRequest','Content-Type':'application/json','X-CSRFToken':getCookie('csrftoken')},credentials:'same-origin'});if(!response.ok){return null;}
return await response.json();}
async function syncUnreadMessagesState(){const data=await getMessage();if(data&&data.has_unread){updateMessageBadge(data.unread_count);if('Notification'in window&&Notification.permission==='denied'){showNotificationPermissionHint();}
await notifyUnreadMessages(data['messages']||[]);return;}
updateMessageBadge(0);clearNotifiedMessageIds();}
function updateMessageBadge(count){const menuBadge=document.getElementById('menu-private-msg-badge');const userBadge=document.getElementById('user-private-msg-badge');if(!menuBadge||!userBadge)return;if(count>0){userBadge.classList.add('show');menuBadge.classList.add('show');userBadge.innerText=String(count);menuBadge.innerText=String(count);}else{userBadge.classList.remove('show');menuBadge.classList.remove('show');userBadge.innerText='';menuBadge.innerText='';}}
function incrementBadge(){const menuBadge=document.getElementById('menu-private-msg-badge');const userBadge=document.getElementById('user-private-msg-badge');if(!menuBadge||!userBadge)return;let currentCount=parseInt(userBadge.innerText)||0;currentCount++;userBadge.classList.add('show');menuBadge.classList.add('show');userBadge.innerText=String(currentCount);menuBadge.innerText=String(currentCount);}
async function notifyUnreadMessages(messages){if(!Array.isArray(messages)||messages.length===0){clearNotifiedMessageIds();return;}
const notifiedIds=new Set(getNotifiedMessageIds());const unreadIds=[];for(const message of messages){unreadIds.push(message.id);if(!notifiedIds.has(message.id)){const shown=await showNotification(message);if(shown){notifiedIds.add(message.id);}}}
saveNotifiedMessageIds(Array.from(notifiedIds).filter((id)=>unreadIds.includes(id)));}
function getNotifiedMessageIds(){try{const rawValue=window.localStorage.getItem(NOTIFIED_MESSAGE_IDS_KEY);const parsedValue=rawValue?JSON.parse(rawValue):[];return Array.isArray(parsedValue)?parsedValue:[];}catch(error){return[];}}
function saveNotifiedMessageIds(messageIds){try{window.localStorage.setItem(NOTIFIED_MESSAGE_IDS_KEY,JSON.stringify(messageIds));}catch(error){}}
function rememberNotifiedMessageId(messageId){const notifiedIds=getNotifiedMessageIds();if(notifiedIds.includes(messageId)){return;}
notifiedIds.push(messageId);saveNotifiedMessageIds(notifiedIds);}
function clearNotifiedMessageIds(){try{window.localStorage.removeItem(NOTIFIED_MESSAGE_IDS_KEY);}catch(error){}}
async function showNotification(message){if(!('Notification'in window)||Notification.permission!=='granted'){if('Notification'in window&&Notification.permission==='denied'){showNotificationPermissionHint();}
return false;}
const title=message.title||'灵爻妙解 - 站长私信';const options={body:(message.content||'您收到一条新消息').substring(0,100),icon:'/static/base/img/lingyao-192x192.png',badge:'/static/base/img/lingyao-96x96.png',tag:'lingyao-admin-private-message',renotify:true,requireInteraction:true,data:{url:'/account/personal_center/?tab=contact-us'}};if('serviceWorker'in navigator){try{const registration=await navigator.serviceWorker.ready;await registration.showNotification(title,options);return true;}catch(error){}}
try{const notification=new Notification(title,options);notification.onclick=function(){window.focus();window.location.href='/account/personal_center/?tab=contact-us';notification.close();};return true;}catch(error){return false;}}
function showNotificationPermissionHint(){}return{enable:function(){},disable:function(){},connect:function(){},disconnect:function(){},onNewMessage:function(){},onUnreadCountUpdate:function(){},onMessagesRead:function(){}};})();;/*!
 * popoPicker.js v2.3 - 性能与内存优化版
 * 日期时间滚动选择器
 *
 * 变更记录 v2.3:
 * - 修复内存泄漏: 添加事件监听器清理机制，防止内存泄漏
 * - 定时器优化: 使用 requestAnimationFrame 替代 setInterval，性能更好
 * - DOM查询优化: 缓存动画状态，减少 getComputedStyle 调用
 * - 数据缓存: 添加静态数据缓存，避免重复生成相同数据
 * - 批量DOM更新: 使用 requestAnimationFrame 批量更新，减少重排重绘
 *
 * 变更记录 v2.2:
 * - 统一配置管理: 所有参数集中到 CONFIG 对象，便于维护
 * - PC端滚轮优化: 添加惯性、吸附、累积滚动，体验更丝滑
 * - 性能优化: 缓存DOM查询结果，减少重绘重排
 * - 动画优化: 可配置缓动函数，不同场景使用不同动画曲线
 * - 代码优化: 提取通用函数，减少代码重复
 *
 * ========================================
 * 使用示例 / Usage Examples
 * ========================================
 *
 * 1. 基础日期时间选择器
 * ------------------------------------------
 * HTML:
 * <input type="text" id="datetime-input" placeholder="选择日期时间" />
 *
 * JavaScript:
 * popoPicker.dateTime('#datetime-input', {
 *     display: 'bottom',        // 显示位置: bottom, center, auto
 *     date: true,               // 显示日期
 *     time: true,               // 显示时间
 *     format: 'YYYY-MM-DD HH:mm:ss',
 *     save: (result, target) => {
 *         console.log('选择的日期时间:', result);
 *     }
 * });
 *
 * 2. PC端输入框聚焦弹出
 * ------------------------------------------
 * popoPicker.dateTime('#pc-datetime', {
 *     display: 'auto',          // PC端自动定位在输入框周围
 *     position: 'bottom-left',  // 优先位置
 *     format: 'YYYY-MM-DD HH:mm:ss'
 * });
 *
 * 3. 仅日期选择器
 * ------------------------------------------
 * popoPicker.dateTime('#date-only', {
 *     date: true,
 *     time: false,
 *     format: 'YYYY-MM-DD'
 * });
 *
 * 4. 自定义选项选择器（基础类调用）
 * ------------------------------------------
 * HTML:
 * <input type="text" id="custom-picker" placeholder="选择城市" />
 *
 * JavaScript:
 * popoPicker.picker('#custom-picker', {
 *     display: 'bottom',        // 显示位置
 *     headTitle: '选择城市',     // 标题
 *     wheels: [
 *         {
 *             infinite: true,   // 是否循环滚动
 *             selected: 'beijing',  // 默认选中值
 *             label: '',        // 标签（如"市"）
 *             data: [
 *                 { value: 'beijing', display: '北京' },
 *                 { value: 'shanghai', display: '上海' },
 *                 { value: 'guangzhou', display: '广州' },
 *                 { value: 'shenzhen', display: '深圳' }
 *             ]
 *         }
 *     ],
 *     save: (result, target) => {
 *         console.log('选择结果:', result);
 *     }
 * });
 *
 * 5. 多列自定义选择器
 * ------------------------------------------
 * popoPicker.picker('#multi-picker', {
 *     display: 'bottom',
 *     headTitle: '选择省市',
 *     wheels: [
 *         {
 *             infinite: false,
 *             selected: 'guangdong',
 *             label: '省',
 *             data: [
 *                 { value: 'guangdong', display: '广东' },
 *                 { value: 'zhejiang', display: '浙江' },
 *                 { value: 'jiangsu', display: '江苏' }
 *             ]
 *         },
 *         {
 *             infinite: false,
 *             selected: 'guangzhou',
 *             label: '市',
 *             data: [
 *                 { value: 'guangzhou', display: '广州' },
 *                 { value: 'shenzhen', display: '深圳' },
 *                 { value: 'dongguan', display: '东莞' }
 *             ]
 *         }
 *     ],
 *     save: (result, target) => {
 *         console.log('选择的省市:', result);
 *     }
 * });
 *
 * ========================================
 * 配置选项 / Configuration Options
 * ========================================
 *
 * @param {string} selector - CSS选择器
 * @param {object} options - 配置选项
 * @param {string} options.display - 显示位置: 'bottom', 'center', 'auto'
 * @param {string} options.position - PC端优先位置: 'bottom-left', 'bottom-right', 'top-left', 'top-right'
 * @param {boolean} options.date - 是否显示日期选择
 * @param {boolean} options.time - 是否显示时间选择
 * @param {string} options.format - 日期时间格式: 'YYYY-MM-DD HH:mm:ss'
 * @param {boolean} options.showLabel - 是否显示标签（年月日时分）
 * @param {boolean} options.showNowBtn - 是否显示"现在"按钮（dateTime模式默认true）
 * @param {string} options.headTitle - 标题栏文字
 * @param {number} options.beginYear - 开始年份
 * @param {number} options.endYear - 结束年份
 * @param {function} options.save - 确认回调函数
 * @param {function} options.cancel - 取消回调函数
 *
 */const popoPicker=(()=>{'use strict';const extend=(...sources)=>{const target=sources[0]||{};for(let i=1;i<sources.length;i++){const source=sources[i];if(source){Object.keys(source).forEach(key=>{if(source[key]!==undefined){target[key]=source[key];}});}}
return target;};const isPC=()=>{const mobileAgents=['Android','iPhone','SymbianOS','Windows Phone','iPad','iPod'];return!mobileAgents.some(agent=>navigator.userAgent.includes(agent));};const padZero=(num)=>String(num).padStart(2,'0');const formatDateTime=(result,format='YYYY-MM-DD HH:mm:ss')=>{if(!result?.length)return'';const values=result.map(r=>r.display);let formatted=format;if(result.length===5){formatted=formatted.replace('YYYY',values[0]).replace('MM',values[1]).replace('DD',values[2]).replace('HH',values[3]).replace('mm',values[4]).replace('ss','00');}else if(result.length===3){formatted=formatted.replace('YYYY',values[0]).replace('MM',values[1]).replace('DD',values[2]);}else if(result.length===2){formatted=formatted.replace('HH',values[0]).replace('mm',values[1]).replace('ss','00');}else{formatted=values.join(' ');}
return formatted;};const isLeapYear=(year)=>{return(year%4===0&&year%100!==0)||year%400===0;};const getDaysInMonth=(year,month)=>{const smallMonths=['04','06','09','11'];if(smallMonths.includes(month)){return 30;}else if(month==='02'){return isLeapYear(Number(year))?29:28;}
return 31;};const createElement=(html)=>{const div=document.createElement('div');div.innerHTML=html;return div.firstElementChild;};const addEventListeners=(element,events)=>{Object.entries(events).forEach(([event,handler])=>{element.addEventListener(event,handler,false);});};const removeElement=(element,delay=300)=>{if(!element)return;element.classList.add('hide');setTimeout(()=>element.remove(),delay);};const createPickerHTML=(config)=>{const{wheels,display,headTitle,showNowBtn}=config;const isCenter=display==='center';const isAuto=display==='auto'&&isPC();return`
            <div class="p-select-wrap${isCenter ? ' p-center' : ''}${isAuto ? ' p-auto' : ''}">
                <div class="p-select-main">
                    ${createHeaderHTML(headTitle, isCenter, showNowBtn)}
                    ${createBodyHTML(wheels)}
                    ${isCenter ? createFooterHTML() : ''}
                </div>
                <div class="p-select-mask"></div>
            </div>
        `;};const createHeaderHTML=(title,isCenter,showNowBtn=false)=>{return`
            <div class="p-select-head">
                ${!isCenter ? '<a href="javascript:void(0)" class="p-select-cancel-btn">取消</a>' : ''}
                ${showNowBtn ? '<a href="javascript:void(0)" class="p-select-now-btn">现在</a>' : ''}
                ${title ? `<div class="p-select-title">${title}</div>` : ''}
                ${!isCenter ? '<a href="javascript:void(0)" class="p-select-submit-btn">确认</a>' : ''}
            </div>
        `;};const createBodyHTML=(wheels)=>{return`
            <div class="p-select-body">
                <div class="p-select-line"></div>
                ${wheels.map(wheel => createWheelHTML(wheel)).join('')}
            </div>
        `;};const createWheelHTML=(wheel)=>{return`
            <div class="p-select-item">
                <div class="p-select-col">
                    <div class="p-select-list">
                        <ul class="p-select-ul"></ul>
                    </div>
                </div>
                ${wheel.label ? `<div class="p-select-col p-select-label">${wheel.label}</div>` : ''}
            </div>
        `;};const createFooterHTML=()=>{return`
            <div class="p-select-foot">
                <a href="javascript:void(0)" class="p-select-cancel-btn">取消</a>
                <a href="javascript:void(0)" class="p-select-submit-btn">确认</a>
            </div>
        `;};const createListItemHTML=(wheel,itemSize)=>{const{data,infinite,selected}=wheel;const len=data.length;const selectedIdx=data.findIndex(item=>item.value===selected);const start=selectedIdx-itemSize;const end=selectedIdx+itemSize;let html='';for(let i=start;i<=end;i++){const idx=infinite?((i%len)+len)%len:i;if(!infinite&&(i<0||i>=len)){html+=`<li data-index="${i}" style="opacity: 0"></li>`;}else{const item=data[idx];html+=`<li data-index="${i}" data-val="${item.value}">${item.display}</li>`;}}
return html;};class WheelScroller{static CONFIG={ITEM_HEIGHT:34,ITEM_SIZE:9,POSITION_OFFSET:68,ANIMATION:{WHEEL_SCROLL:100,TOUCH_SCROLL:0,TOUCH_END:200,INERTIA_MIN:500,INERTIA_MAX:1500,SNAP:200},THROTTLE:{WHEEL:16,UPDATE:100},INERTIA:{TIME_THRESHOLD:300,SPEED_MULTIPLIER:3},WHEEL:{DELTA_THRESHOLD:80,MAX_DELTA:260,MAX_STEPS_PER_EVENT:3,NON_INFINITE_MAX_STEPS:3,ACCUMULATOR_TIMEOUT:250},EASING:{DEFAULT:'cubic-bezier(0.19, 1, 0.22, 1)',SNAP:'cubic-bezier(0.25, 0.46, 0.45, 0.94)',WHEEL:'cubic-bezier(0.33, 1, 0.68, 1)'}};constructor(element,wheel,index,picker){this.element=element;this.wheel=wheel;this.index=index;this.picker=picker;this.ITEM_HEIGHT=WheelScroller.CONFIG.ITEM_HEIGHT;this.ITEM_SIZE=WheelScroller.CONFIG.ITEM_SIZE;this.POSITION_OFFSET=WheelScroller.CONFIG.POSITION_OFFSET;this.state={scrollY:-this.ITEM_HEIGHT*this.ITEM_SIZE,marginTop:0,current:0,clickDown:false,inertia:true,startY:0,curY:0,lastY:1,moveY:0,hasMoved:false,startTime:null,endTime:null,pendingWheelDelta:0,lastWheelAppliedTime:0,lastWheelDir:0};this.scrollList=element.querySelector('.p-select-ul');this.items=[];this._cachedPosition=this.POSITION_OFFSET;this.wheelThrottleTimer=null;this.wheelAccumulator=0;this.wheelAccumulatorTimer=null;this.inertiaAnimationFrame=null;this.inertiaUpdateTimer=null;this.eventHandlers={touchStart:this.handleTouchStart.bind(this),touchMove:this.handleTouchMove.bind(this),touchEnd:this.handleTouchEnd.bind(this),wheel:this.handleWheel.bind(this),itemClick:this.handleItemClick.bind(this)};this.data=wheel.data;this.infinite=wheel.infinite;this.selectedIdx=this.getSelectedIndex();this.init();}
getSelectedIndex(){return this.data.findIndex(item=>item.value===this.wheel.selected)||0;}
init(){this.renderItems();this.bindEvents();this.updatePosition(0,this.state.scrollY);}
renderItems(){this.scrollList.innerHTML=createListItemHTML(this.wheel,this.ITEM_SIZE);this.items=Array.from(this.scrollList.querySelectorAll('li'));}
bindEvents(){if(isPC()){this.bindPCEvents();}else{this.bindMobileEvents();}
this.scrollList.addEventListener('click',this.eventHandlers.itemClick,false);}
bindPCEvents(){this.scrollContainer=this.element.querySelector('.p-select-list');this.element.addEventListener('mousedown',this.eventHandlers.touchStart,false);this.scrollContainer.addEventListener('wheel',this.eventHandlers.wheel,{passive:false});document.addEventListener('mousemove',this.eventHandlers.touchMove,false);document.addEventListener('mouseup',this.eventHandlers.touchEnd,false);}
bindMobileEvents(){this.element.addEventListener('touchstart',this.eventHandlers.touchStart,{passive:true});this.element.addEventListener('touchmove',this.eventHandlers.touchMove,{passive:false});this.element.addEventListener('touchend',this.eventHandlers.touchEnd,{passive:true});this.element.addEventListener('touchcancel',this.eventHandlers.touchEnd,{passive:true});}
applyBoundary(scrollY){if(this.infinite){return scrollY;}
const maxScroll=this.selectedIdx*this.ITEM_HEIGHT-this.ITEM_HEIGHT*this.ITEM_SIZE;const minScroll=maxScroll-this.ITEM_HEIGHT*(this.data.length-1);return Math.max(minScroll,Math.min(maxScroll,scrollY));}
handleWheel(e){e.preventDefault();e.stopPropagation();const config=WheelScroller.CONFIG;let delta=e.deltaY;if(e.deltaMode===1){delta*=this.ITEM_HEIGHT;}else if(e.deltaMode===2){delta*=this.ITEM_HEIGHT*this.ITEM_SIZE;}
const maxDelta=config.WHEEL.MAX_DELTA;if(maxDelta){delta=Math.max(-maxDelta,Math.min(maxDelta,delta));}
this.state.pendingWheelDelta+=delta;this.scheduleWheelProcess();}
scheduleWheelProcess(){const config=WheelScroller.CONFIG;if(this.wheelThrottleTimer){return;}
this.wheelThrottleTimer=setTimeout(()=>{this.wheelThrottleTimer=null;this.applyWheelDelta();},config.THROTTLE.WHEEL);}
applyWheelDelta(){const config=WheelScroller.CONFIG;const delta=this.state.pendingWheelDelta;if(!delta){return;}
this.state.pendingWheelDelta=0;this.wheelAccumulator+=delta;const threshold=config.WHEEL.DELTA_THRESHOLD||(this.ITEM_HEIGHT*2);let steps=Math.trunc(this.wheelAccumulator/threshold);if(Math.abs(steps)<1){return;}
const now=Date.now();const dir=Math.sign(steps);const fastScroll=this.state.lastWheelAppliedTime&&(now-this.state.lastWheelAppliedTime<80)&&dir===this.state.lastWheelDir;let maxSteps=this.infinite?config.WHEEL.MAX_STEPS_PER_EVENT:config.WHEEL.NON_INFINITE_MAX_STEPS;if(fastScroll&&maxSteps){maxSteps=maxSteps*2;}
if(maxSteps){steps=Math.max(-maxSteps,Math.min(maxSteps,steps));}
this.wheelAccumulator-=steps*threshold;this.state.scrollY+=steps*this.ITEM_HEIGHT;this.state.scrollY=this.applyBoundary(this.state.scrollY);this.state.scrollY=this.snapToGrid(this.state.scrollY);this.updatePosition(config.ANIMATION.WHEEL_SCROLL,this.state.scrollY,'WHEEL');this.updateItems(this.state.scrollY);this.notifyChange();this.state.lastWheelAppliedTime=now;this.state.lastWheelDir=dir;clearTimeout(this.wheelAccumulatorTimer);this.wheelAccumulatorTimer=setTimeout(()=>{this.wheelAccumulator=0;},config.WHEEL.ACCUMULATOR_TIMEOUT);if(Math.abs(this.wheelAccumulator)>=threshold){this.scheduleWheelProcess();}}
handleTouchStart(e){this.state.startY=e.type==='touchstart'?e.touches[0].clientY:e.clientY;this.state.startTime=Date.now();this.state.moveY=0;this.state.hasMoved=false;if(e.type==='mousedown'){this.state.clickDown=true;}}
handleTouchMove(e){if(e.type==='touchmove'){e.preventDefault();this.state.curY=e.touches[0].clientY;}else{if(!this.state.clickDown)return;this.state.curY=e.clientY;}
this.state.moveY=this.state.curY-this.state.startY;if(Math.abs(this.state.moveY)>2){this.state.hasMoved=true;}
const distance=this.state.scrollY+this.state.moveY;this.updateItems();this.state.lastY=this.state.curY;this.updatePosition(WheelScroller.CONFIG.ANIMATION.TOUCH_SCROLL,distance);}
handleTouchEnd(e){const clientY=e.type==='touchend'?e.changedTouches[0].clientY:e.clientY;if(e.type==='mouseup'){if(!this.state.clickDown)return;this.state.clickDown=false;}
this.state.lastY=clientY;this.state.endTime=Date.now();if(this.state.hasMoved){this.applyInertia();this.notifyChange();}}
applyInertia(){const interval=this.state.endTime-this.state.startTime;const config=WheelScroller.CONFIG;let speed=config.ANIMATION.INERTIA_MIN;let addPos;let easingType='DEFAULT';const absMove=Math.abs(this.state.moveY);if(this.state.inertia&&interval<config.INERTIA.TIME_THRESHOLD&&absMove>0){speed=Math.abs(this.state.moveY/interval)*1000;speed=Math.max(config.ANIMATION.INERTIA_MIN,Math.min(config.ANIMATION.INERTIA_MAX,Math.round(speed)));addPos=(speed/config.INERTIA.SPEED_MULTIPLIER)*(this.state.moveY<0?-1:1);}else{addPos=this.state.moveY;this.state.inertia=true;speed=config.ANIMATION.SNAP;easingType='SNAP';}
if(absMove<this.ITEM_HEIGHT/2){addPos=0;speed=config.ANIMATION.SNAP;easingType='SNAP';}
this.state.scrollY+=this.snapToGrid(addPos);this.state.moveY=0;this.state.scrollY=this.applyBoundary(this.state.scrollY);const startTime=Date.now();const updateItems=()=>{const elapsed=Date.now()-startTime;if(elapsed<speed){this.updateItems();this.inertiaAnimationFrame=requestAnimationFrame(updateItems);}else{this.updateItems();this.inertiaAnimationFrame=null;}};this.inertiaAnimationFrame=requestAnimationFrame(updateItems);this.updatePosition(speed,this.state.scrollY,easingType);}
snapToGrid(pos){const rounded=Math.round(pos);const remainder=Math.round(rounded%this.ITEM_HEIGHT);const half=this.ITEM_HEIGHT/2;if(Math.abs(remainder)<half){return rounded-remainder;}
return rounded-remainder+(rounded>0?this.ITEM_HEIGHT:-this.ITEM_HEIGHT);}
updatePosition(duration,pos,easingType='DEFAULT'){const easingFunc=WheelScroller.CONFIG.EASING[easingType];this.scrollList.style.transition=duration===0?'none':`transform ${duration}ms ${easingFunc}`;this.scrollList.style.transform=`translate3d(0, ${pos + this.POSITION_OFFSET}px, 0)`;this._cachedPosition=pos+this.POSITION_OFFSET;this._isAnimating=duration>0;if(duration>0){setTimeout(()=>{this._isAnimating=false;},duration);}}
updateItems(forcePos){let currentPos;if(forcePos!==undefined){currentPos=forcePos;}else{currentPos=this.getCurrentPosition()-this.POSITION_OFFSET;}
const index=Math.round(-currentPos/this.ITEM_HEIGHT)-this.ITEM_SIZE;const diff=index-this.state.current;if(!diff)return;this.state.current=index;const len=this.data.length;const updates=[];this.items.forEach(item=>{let itemIndex=Number(item.getAttribute('data-index'))+diff;const update={element:item,index:itemIndex,visible:true,value:'',display:''};if(!this.infinite&&(itemIndex<0||itemIndex>=len)){update.visible=false;}else{const dataIdx=this.infinite?((itemIndex%len)+len)%len:itemIndex;update.value=this.data[dataIdx].value;update.display=this.data[dataIdx].display;}
updates.push(update);});requestAnimationFrame(()=>{updates.forEach(update=>{const item=update.element;item.setAttribute('data-index',update.index);if(!update.visible){item.style.opacity='0';item.textContent='';item.removeAttribute('data-val');}else{item.style.opacity='1';item.setAttribute('data-val',update.value);item.textContent=update.display;}});this.state.marginTop+=diff*this.ITEM_HEIGHT;this.scrollList.style.marginTop=`${this.state.marginTop}px`;});}
getCurrentPosition(){if(!this._isAnimating&&this._cachedPosition!==undefined){return this._cachedPosition;}
const transform=getComputedStyle(this.scrollList).transform;if(transform==='none'){return this._cachedPosition||0;}
const matrix=transform.match(/matrix.*\((.+)\)/);if(!matrix){return this._cachedPosition||0;}
const values=matrix[1].split(', ');return Number(values[13]||values[5])||0;}
getValue(){const pos=this.state.scrollY;const dataIndex=Math.round(-pos/this.ITEM_HEIGHT)-this.ITEM_SIZE+this.selectedIdx;const len=this.data.length;let index=(dataIndex%len+len)%len;return{value:this.data[index].value,display:this.data[index].display,dataIndex:dataIndex};}
notifyChange(){this.picker.updateResult(this.index,this.getValue());}
handleItemClick(e){const item=e.target.closest('li');if(!item||item.style.opacity==='0')return;const value=item.getAttribute('data-val');if(!value)return;if(this.inertiaAnimationFrame){cancelAnimationFrame(this.inertiaAnimationFrame);this.inertiaAnimationFrame=null;}
this.scrollTo(value);}
scrollTo(value){this.wheel.selected=value;const newSelectedIdx=this.getSelectedIndex();const diff=this.selectedIdx-newSelectedIdx;this.state.scrollY=-this.ITEM_HEIGHT*this.ITEM_SIZE+diff*this.ITEM_HEIGHT;this.updatePosition(WheelScroller.CONFIG.ANIMATION.SNAP,this.state.scrollY,'SNAP');this.updateItems(this.state.scrollY);this.notifyChange();}
updateData(newData){this.data=newData;this.wheel.data=newData;this.renderItems();this.scrollTo(this.picker.getResult(this.index).value);}
removeItems(values){const newData=this.data.filter(item=>!values.includes(item.value));this.updateData(newData);}
destroy(){if(this.wheelThrottleTimer){clearTimeout(this.wheelThrottleTimer);this.wheelThrottleTimer=null;}
if(this.wheelAccumulatorTimer){clearTimeout(this.wheelAccumulatorTimer);this.wheelAccumulatorTimer=null;}
if(this.inertiaAnimationFrame){cancelAnimationFrame(this.inertiaAnimationFrame);this.inertiaAnimationFrame=null;}
if(this.inertiaUpdateTimer){clearInterval(this.inertiaUpdateTimer);this.inertiaUpdateTimer=null;}
if(isPC()){this.element.removeEventListener('mousedown',this.eventHandlers.touchStart,false);if(this.scrollContainer){this.scrollContainer.removeEventListener('wheel',this.eventHandlers.wheel,false);}
document.removeEventListener('mousemove',this.eventHandlers.touchMove,false);document.removeEventListener('mouseup',this.eventHandlers.touchEnd,false);}else{this.element.removeEventListener('touchstart',this.eventHandlers.touchStart,false);this.element.removeEventListener('touchmove',this.eventHandlers.touchMove,false);this.element.removeEventListener('touchend',this.eventHandlers.touchEnd,false);this.element.removeEventListener('touchcancel',this.eventHandlers.touchEnd,false);}
if(this.scrollList){this.scrollList.removeEventListener('click',this.eventHandlers.itemClick,false);}
this.eventHandlers=null;this.scrollList=null;this.items=null;this.element=null;this.scrollContainer=null;}}
class PickerBase{constructor(selector,options){this.options=extend({container:'body',display:'bottom',position:'bottom-left',headTitle:'',format:'YYYY-MM-DD HH:mm:ss',wheels:[],showNowBtn:false,init:()=>{},getResult:()=>{},save:()=>{},cancel:()=>{},now:()=>{}},options);this.targets=document.querySelectorAll(selector);this.currentTarget=null;this.scrollers=[];this.results=[];this.bindTargets();}
bindTargets(){this.targets.forEach(target=>{this.initTarget(target);this.bindTargetEvents(target);});}
initTarget(target){const isInput=target.matches('input, textarea');if(isInput){target.setAttribute('unselectable','on');if(!isPC()){target.setAttribute('readonly','true');target.setAttribute('inputmode','none');target.setAttribute('autocomplete','off');target.setAttribute('autocorrect','off');target.setAttribute('autocapitalize','off');target.setAttribute('spellcheck','false');target.style.cursor='pointer';target.style.userSelect='none';target.style.webkitUserSelect='none';if(!target.getAttribute('placeholder')){target.setAttribute('placeholder',' ');}}
if(target.value){target.classList.add('has-value');}}
const value=isInput?target.value:target.textContent;if(value){const numbers=value.match(/\d+/g);if(numbers){target.setAttribute('data-value',numbers.join(','));}}}
bindTargetEvents(target){const isInput=target.matches('input, textarea');const showPicker=(e)=>{e.preventDefault();if(document.querySelector('.p-scroll')){return;}
this.show(target);};target.addEventListener('click',showPicker,false);if(isInput){target.addEventListener('focus',showPicker,false);}}
show(target){this.currentTarget=target;const wheels=this.prepareWheels(target);this.render(wheels);this.initScrollers(wheels);this.bindPickerEvents();if(this.options.display==='auto'&&isPC()){this.positionPicker(target);}
this.options.init({result:this.results,scrollEvt:this.scrollers});}
prepareWheels(target){const wheels=JSON.parse(JSON.stringify(this.options.wheels));const savedValue=target.getAttribute('data-value');if(savedValue){const values=savedValue.split(',');values.forEach((val,i)=>{if(wheels[i]){wheels[i].selected=val;}});}
return wheels;}
render(wheels){const html=createPickerHTML({wheels,display:this.options.display,headTitle:this.options.headTitle,showNowBtn:this.options.showNowBtn});const wrapper=createElement(`<div class="p-scroll">${html}</div>`);document.querySelector(this.options.container).appendChild(wrapper);}
initScrollers(wheels){const items=document.querySelectorAll('.p-select-item');this.scrollers=[];this.results=[];items.forEach((element,index)=>{const scroller=new WheelScroller(element,wheels[index],index,this);this.scrollers.push(scroller);this.results.push(scroller.getValue());});}
bindPickerEvents(){const submitBtn=document.querySelector('.p-select-submit-btn');const cancelBtn=document.querySelector('.p-select-cancel-btn');const nowBtn=document.querySelector('.p-select-now-btn');const mask=document.querySelector('.p-select-mask');const scroll=document.querySelector('.p-scroll');submitBtn?.addEventListener('click',()=>this.handleSave(),false);cancelBtn?.addEventListener('click',()=>this.handleCancel(),false);nowBtn?.addEventListener('click',()=>this.handleNow(),false);mask?.addEventListener('click',()=>this.handleCancel(),false);scroll?.addEventListener('touchmove',(e)=>e.preventDefault(),{passive:false});}
positionPicker(target){const wrapper=document.querySelector('.p-select-wrap');const rect=target.getBoundingClientRect();const pickerHeight=300;const pickerWidth=320;let top,left;const position=this.options.position;if(position.includes('bottom')){top=rect.bottom+pickerHeight<window.innerHeight?rect.bottom+5:rect.top-pickerHeight-5;}else{top=rect.top-pickerHeight>0?rect.top-pickerHeight-5:rect.bottom+5;}
if(position.includes('left')){left=Math.min(rect.left,window.innerWidth-pickerWidth-10);}else{left=Math.max(10,rect.right-pickerWidth);}
wrapper.style.position='fixed';wrapper.style.top=`${top}px`;wrapper.style.left=`${left}px`;wrapper.style.transform='none';}
handleSave(){const values=this.results.map(r=>r.value);const formatted=formatDateTime(this.results,this.options.format);this.currentTarget.setAttribute('data-value',values.join(','));const isInput=this.currentTarget.matches('input, textarea');if(isInput){this.currentTarget.value=formatted;this.currentTarget.classList.add('has-value');this.currentTarget.dispatchEvent(new Event('input',{bubbles:true}));this.currentTarget.dispatchEvent(new Event('change',{bubbles:true}));}else{this.currentTarget.textContent=formatted;}
this.options.getResult({result:this.results,scrollEvt:this.scrollers});this.options.save(formatted,this.currentTarget);this.destroy();}
handleCancel(){this.options.cancel();this.destroy();}
handleNow(){this.options.now({result:this.results,scrollEvt:this.scrollers,target:this.currentTarget});}
updateResult(index,value){this.results[index]=value;this.options.getResult({result:this.results,scrollEvt:this.scrollers,scrollIdx:index});}
getResult(index){return this.results[index]||{};}
destroy(){const scroll=document.querySelector('.p-scroll');removeElement(scroll);this.scrollers.forEach(scroller=>{if(scroller&&typeof scroller.destroy==='function'){scroller.destroy();}});this.scrollers=[];this.results=[];}}
class DateTimePicker{static dataCache={month:null,day:null,hour:null,minute:null,years:{}};constructor(selector,options){this.options=extend({container:'body',display:'bottom',position:'bottom-left',headTitle:'',showLabel:true,showNowBtn:true,date:true,time:true,format:'YYYY-MM-DD HH:mm:ss',beginYear:new Date().getFullYear()-100,endYear:new Date().getFullYear()+100,save:()=>{},cancel:()=>{}},options);this.createPicker(selector);}
createPicker(selector){const wheels=this.createWheels();new PickerBase(selector,{...this.options,wheels,init:(rs)=>this.handleInit(rs),getResult:(rs)=>this.handleUpdate(rs),now:(rs)=>this.handleNow(rs)});}
createWheels(){const now=new Date();const labels=this.options.showLabel?['年','月','日','时','']:['','','','',''];const wheels=[{infinite:false,selected:padZero(now.getFullYear()),label:labels[0],data:this.generateYearData()},{infinite:true,selected:padZero(now.getMonth()+1),label:labels[1],data:this.generateMonthData()},{infinite:true,selected:padZero(now.getDate()),label:labels[2],data:this.generateDayData()},{infinite:true,selected:padZero(now.getHours()),label:labels[3],data:this.generateHourData()},{infinite:true,selected:padZero(now.getMinutes()),label:labels[4],data:this.generateMinuteData()}];return this.filterWheels(wheels);}
filterWheels(wheels){let filtered=wheels;if(!this.options.date){filtered=filtered.slice(3);}
if(!this.options.time){filtered=filtered.slice(0,3);if(filtered.length>0){filtered[filtered.length-1].label='';}}
return filtered;}
generateYearData(){const cacheKey=`${this.options.beginYear}-${this.options.endYear}`;if(DateTimePicker.dataCache.years[cacheKey]){return DateTimePicker.dataCache.years[cacheKey];}
const data=[];for(let i=this.options.beginYear;i<=this.options.endYear;i++){data.push({value:padZero(i),display:padZero(i)});}
DateTimePicker.dataCache.years[cacheKey]=data;return data;}
generateMonthData(){if(DateTimePicker.dataCache.month){return DateTimePicker.dataCache.month;}
const data=Array.from({length:12},(_,i)=>{const val=padZero(i+1);return{value:val,display:val};});DateTimePicker.dataCache.month=data;return data;}
generateDayData(){if(DateTimePicker.dataCache.day){return DateTimePicker.dataCache.day;}
const data=Array.from({length:31},(_,i)=>{const val=padZero(i+1);return{value:val,display:val};});DateTimePicker.dataCache.day=data;return data;}
generateHourData(){if(DateTimePicker.dataCache.hour){return DateTimePicker.dataCache.hour;}
const data=Array.from({length:24},(_,i)=>{const val=padZero(i);return{value:val,display:val};});DateTimePicker.dataCache.hour=data;return data;}
generateMinuteData(){if(DateTimePicker.dataCache.minute){return DateTimePicker.dataCache.minute;}
const data=Array.from({length:60},(_,i)=>{const val=padZero(i);return{value:val,display:val};});DateTimePicker.dataCache.minute=data;return data;}
handleInit(rs){if(this.options.date&&rs.scrollEvt.length>=3){const year=rs.result[0].value;const month=rs.result[1].value;this.updateDays(rs.scrollEvt[2],year,month);}}
handleUpdate(rs){if(this.options.date&&(rs.scrollIdx===0||rs.scrollIdx===1)){const year=rs.result[0].value;const month=rs.result[1].value;this.updateDays(rs.scrollEvt[2],year,month);}}
handleNow(rs){const now=new Date();const scrollers=rs.scrollEvt;if(this.options.date&&this.options.time){scrollers[0].scrollTo(padZero(now.getFullYear()));scrollers[1].scrollTo(padZero(now.getMonth()+1));scrollers[2].scrollTo(padZero(now.getDate()));scrollers[3].scrollTo(padZero(now.getHours()));scrollers[4].scrollTo(padZero(now.getMinutes()));}else if(this.options.date){scrollers[0].scrollTo(padZero(now.getFullYear()));scrollers[1].scrollTo(padZero(now.getMonth()+1));scrollers[2].scrollTo(padZero(now.getDate()));}else if(this.options.time){scrollers[0].scrollTo(padZero(now.getHours()));scrollers[1].scrollTo(padZero(now.getMinutes()));}}
updateDays(dayScroller,year,month){const maxDays=getDaysInMonth(year,month);const validDays=Array.from({length:31},(_,i)=>i+1).filter(day=>day<=maxDays).map(day=>padZero(day));const invalidDays=Array.from({length:31},(_,i)=>padZero(i+1)).filter(day=>!validDays.includes(day));const allDays=Array.from({length:31},(_,i)=>{const val=padZero(i+1);return{value:val,display:val};});dayScroller.updateData(allDays);if(invalidDays.length>0){dayScroller.removeItems(invalidDays);}}}
return{dateTime:(selector,options)=>new DateTimePicker(selector,options),picker:(selector,options)=>new PickerBase(selector,options),DateTimePicker,PickerBase};})();;(()=>{const container=document.getElementById('starsContainer');const numStars=50;let starsCreated=false;function shouldShowStars(){return!document.documentElement.classList.contains('light');}
function createStars(){if(starsCreated)return;for(let i=0;i<numStars;i++){const star=document.createElement('div');star.className='star';const size=Math.random()>0.95?3:Math.random()>0.7?2:1;star.classList.add('size'+size);if(size>=2&&Math.random()>0.5){const colors=['color1','color2','color3'];star.classList.add(colors[Math.floor(Math.random()*colors.length)]);}
star.style.left=Math.random()*100+'%';star.style.top=Math.random()*100+'%';const duration=3+Math.random()*9;star.style.animationDuration=duration+'s';star.style.animationDelay=Math.random()*duration+'s';const driftX=(Math.random()-0.5)*0.03;const driftY=(Math.random()-0.5)*0.03;let posX=parseFloat(star.style.left);let posY=parseFloat(star.style.top);function drift(){posX+=driftX;posY+=driftY;if(posX<0)posX=100;if(posX>100)posX=0;if(posY<0)posY=100;if(posY>100)posY=0;star.style.left=posX+'%';star.style.top=posY+'%';requestAnimationFrame(drift);}
drift();container.appendChild(star);}
starsCreated=true;}
function initStars(){if(!shouldShowStars()){return;}
createStars();setTimeout(()=>{container.classList.add('stars-loaded');},100);}
function watchThemeChange(){const observer=new MutationObserver((mutations)=>{mutations.forEach((mutation)=>{if(mutation.type==='attributes'&&mutation.attributeName==='class'){const isDarkTheme=shouldShowStars();if(isDarkTheme){if(!starsCreated){createStars();}
container.classList.add('stars-loaded');}else{container.classList.remove('stars-loaded');}}});});observer.observe(document.documentElement,{attributes:true,attributeFilter:['class']});}
function scheduleShootingStar(){const delay=4000+Math.random()*11000;setTimeout(()=>{scheduleShootingStar();},delay);}
if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',()=>{initStars();watchThemeChange();});}else{initStars();watchThemeChange();}
scheduleShootingStar();})();;const guideModule=(()=>{'use strict';document.addEventListener('DOMContentLoaded',init);const CONFIG={STORAGE_KEY_COMPLETED:'guide_completed',STORAGE_KEY_SKIPPED:'guide_skipped',STORAGE_KEY_CURRENT_STEP:'guide_current_step',STORAGE_KEY_CURRENT_PAGE:'guide_current_page',SESSION_KEY_PROMPT_SHOWN_PAGE:'guide_prompt_shown_page',WAIT_FOR_ELEMENT_TIMEOUT:5000,SW_STABLE_TIMEOUT:3000,OVERLAY_CLASS:'guide-overlay',ALLOWED_URL_PATTERN:new RegExp('^('+window.location.origin+')?/[^/]')};let steps=[];let currentStepIndex=0;let isGuideActive=false;let highlightElement=null;let overlayElement=null;let holeRect=null;let waitTimer=null;let conditionTimer=null;let conditionObserver=null;let conditionTimeoutId=null;let throttledUpdateOverlay=null;let mutationObserver=null;let guideButton=null;let guideButtonClickHandler=null;let overlayInitialized=false;const eventListeners={};function on(eventName,callback){if(!eventListeners[eventName]){eventListeners[eventName]=[];}
eventListeners[eventName].push(callback);}
function emit(eventName,data){if(!eventListeners[eventName])return;eventListeners[eventName].forEach(function(callback){try{callback(data);}catch(error){console.error('guideModule: 事件回调执行错误',error);}});}
function off(eventName,callback){if(!eventListeners[eventName])return;const index=eventListeners[eventName].indexOf(callback);if(index>-1){eventListeners[eventName].splice(index,1);}}
function isUrlSafe(url){try{const parsedUrl=new URL(url,window.location.origin);return parsedUrl.origin===window.location.origin;}catch(e){return url.startsWith('/')&&!url.includes('//');}}
function rafThrottle(func){let rafId=null;let lastArgs=null;return function(){lastArgs=arguments;if(rafId===null){rafId=requestAnimationFrame(function(){rafId=null;func.apply(this,lastArgs);});}};}
function normalizePath(path){if(!path||path===''){return'/';}
if(path.length>1&&path.endsWith('/')){return path.slice(0,-1);}
return path;}
function init(){bindEvents();const currentPage=normalizePath(window.location.pathname);const savedPage=normalizePath(localStorage.getItem(CONFIG.STORAGE_KEY_CURRENT_PAGE));const savedStepId=localStorage.getItem(CONFIG.STORAGE_KEY_CURRENT_STEP);if(savedPage&&savedStepId){isGuideActive=false;tryResumeGuide(savedPage,savedStepId,currentPage);}else{if(shouldShowGuidePrompt()){scheduleGuidePrompt();}}}
function scheduleGuidePrompt(){if(!('serviceWorker'in navigator)){showGuidePrompt();return;}
if(navigator.serviceWorker.controller){showGuidePrompt();return;}
let promptShown=false;let fallbackTimer=null;function cleanup(){if(fallbackTimer){clearTimeout(fallbackTimer);fallbackTimer=null;}
navigator.serviceWorker.removeEventListener('controllerchange',handleControllerChange);}
function showPromptOnce(){if(promptShown){return;}
promptShown=true;cleanup();if(shouldShowGuidePrompt()){showGuidePrompt();}}
function handleControllerChange(){cleanup();}
navigator.serviceWorker.addEventListener('controllerchange',handleControllerChange);fallbackTimer=setTimeout(function(){showPromptOnce();},CONFIG.SW_STABLE_TIMEOUT);}
function tryResumeGuide(savedPage,savedStepId,currentPage){let stepsRegistered=false;let resumeTimer=null;const MAX_WAIT_TIME=10000;function cleanup(){if(resumeTimer){clearTimeout(resumeTimer);resumeTimer=null;}
off('stepsRegistered',onStepsRegistered);}
function onStepsRegistered(){if(stepsRegistered)return;stepsRegistered=true;if(savedPage===currentPage){startFrom(savedStepId);}else{const currentStep=steps.find(function(s){return normalizePath(s.page||window.location.pathname)===currentPage;});if(currentStep){startFrom(currentStep.id);}else{console.log('guideModule: 当前页面无引导步骤，等待页面跳转 savedPage='+savedPage+', currentPage='+currentPage);}}
cleanup();}
on('stepsRegistered',onStepsRegistered);if(steps.length>0){onStepsRegistered();return;}
resumeTimer=setTimeout(function(){if(!stepsRegistered){console.warn('guideModule: 等待步骤注册超时');cleanup();}},MAX_WAIT_TIME);}
function bindEvents(){guideButton=document.getElementById('guide');if(guideButton){guideButtonClickHandler=function(){const event=new CustomEvent('guideButtonClick',{detail:{}});document.dispatchEvent(event);};guideButton.addEventListener('click',guideButtonClickHandler);}}
function unbindEvents(){if(guideButton&&guideButtonClickHandler){guideButton.removeEventListener('click',guideButtonClickHandler);guideButton=null;guideButtonClickHandler=null;}}
function shouldShowGuidePrompt(){const completed=localStorage.getItem(CONFIG.STORAGE_KEY_COMPLETED);const skipped=localStorage.getItem(CONFIG.STORAGE_KEY_SKIPPED);const currentStep=localStorage.getItem(CONFIG.STORAGE_KEY_CURRENT_STEP);const currentPage=localStorage.getItem(CONFIG.STORAGE_KEY_CURRENT_PAGE);const promptShownPage=sessionStorage.getItem(CONFIG.SESSION_KEY_PROMPT_SHOWN_PAGE);const normalizedCurrentPath=normalizePath(window.location.pathname);if(currentStep&&currentPage){return false;}
if(promptShownPage===normalizedCurrentPath){return false;}
return!completed&&!skipped;}
function showGuidePrompt(){sessionStorage.setItem(CONFIG.SESSION_KEY_PROMPT_SHOWN_PAGE,normalizePath(window.location.pathname));messageModule.show({title:'新手引导',content:'是否需要新手引导？\n\n如果您对六爻、大六壬、奇门遁甲等预测术数不太了解，或第一次使用本网站，建议您开启新手引导。',showCancel:true,showClose:true,confirmText:'请引导我',cancelText:'我很专业，不再询问',onConfirm:function(){start();},onCancel:function(){skipGuide();}});}
function skipGuide(){localStorage.setItem(CONFIG.STORAGE_KEY_SKIPPED,'true');}
function completeGuide(){localStorage.setItem(CONFIG.STORAGE_KEY_COMPLETED,'true');localStorage.removeItem(CONFIG.STORAGE_KEY_CURRENT_STEP);localStorage.removeItem(CONFIG.STORAGE_KEY_CURRENT_PAGE);}
function registerSteps(stepList){if(!Array.isArray(stepList)){console.error('guideModule: 步骤列表必须是数组');return;}
for(let i=0;i<stepList.length;i++){const step=stepList[i];if(!step||typeof step!=='object'){console.error('guideModule: 步骤 '+i+' 不是有效的对象');return;}
if(!step.id||typeof step.id!=='string'){console.error('guideModule: 步骤 '+i+' 缺少有效的 id');return;}
if(!step.target||typeof step.target!=='string'){console.error('guideModule: 步骤 '+i+' 缺少有效的 target');return;}
if(!step.title||typeof step.title!=='string'){console.error('guideModule: 步骤 '+i+' 缺少有效的 title');return;}
if(!step.content||typeof step.content!=='string'){console.error('guideModule: 步骤 '+i+' 缺少有效的 content');return;}
if(step.actionUrl&&!isUrlSafe(step.actionUrl)){console.error('guideModule: 步骤 '+i+' 的 actionUrl 不安全: '+step.actionUrl);return;}}
const wasEmpty=steps.length===0;steps=stepList;if(wasEmpty&&steps.length>0){emit('stepsRegistered',steps);}}
function start(){if(steps.length===0){console.warn('guideModule: 没有注册任何引导步骤');return;}
startFrom(steps[0].id);}
function startFrom(stepId){if(isGuideActive){console.log('guideModule: 引导已在进行中，忽略重复调用');return;}
const index=steps.findIndex(function(s){return s.id===stepId;});if(index===-1){console.error('guideModule: 未找到步骤 '+stepId);return;}
currentStepIndex=index;isGuideActive=true;const currentStep=steps[currentStepIndex];localStorage.setItem(CONFIG.STORAGE_KEY_CURRENT_STEP,stepId);localStorage.setItem(CONFIG.STORAGE_KEY_CURRENT_PAGE,normalizePath(currentStep.page||window.location.pathname));showStep(currentStep);}
function showStep(step){if(!step){finishGuide();return;}
if(step.action==='click'&&step.actionTarget){const actionElement=safeQuerySelector(step.actionTarget);if(actionElement){handleActionBeforeGuide(step,actionElement);return;}else{console.warn('guideModule: 未找到操作目标元素 '+step.actionTarget);nextStep();return;}}
waitForElement(step.target,function(element){if(!element){console.warn('guideModule: 未找到目标元素 '+step.target);nextStep();return;}
highlightTarget(element,function(){showGuideBox(step,element);});});}
function safeQuerySelector(selector){if(selector.startsWith('#')&&selector.length>1){const idValue=selector.slice(1);if(/^\d/.test(idValue)){return document.querySelector('[id="'+idValue+'"]');}}
return document.querySelector(selector);}
function waitForElement(selector,callback){const element=safeQuerySelector(selector);if(element){callback(element);return;}
if(mutationObserver){mutationObserver.disconnect();mutationObserver=null;}
let found=false;let timeoutId=null;function cleanup(){if(mutationObserver){mutationObserver.disconnect();mutationObserver=null;}
if(timeoutId){clearTimeout(timeoutId);timeoutId=null;}}
mutationObserver=new MutationObserver(function(){if(found)return;const el=safeQuerySelector(selector);if(el){found=true;cleanup();callback(el);}});mutationObserver.observe(document.body||document.documentElement,{childList:true,subtree:true});timeoutId=setTimeout(function(){if(!found){found=true;cleanup();console.warn('guideModule: 等待元素超时 '+selector);callback(null);}},CONFIG.WAIT_FOR_ELEMENT_TIMEOUT);}
function highlightTarget(element,onComplete){removeHighlight();highlightElement=element;throttledUpdateOverlay=rafThrottle(updateOverlay);initOverlay();scrollIntoViewIfNeeded(element,function(){updateOverlay();window.addEventListener('resize',throttledUpdateOverlay);window.addEventListener('scroll',throttledUpdateOverlay,true);if(onComplete){onComplete();}});}
function isElementInViewport(el){const rect=el.getBoundingClientRect();const viewportWidth=window.innerWidth||document.documentElement.clientWidth;const viewportHeight=window.innerHeight||document.documentElement.clientHeight;const isInViewport=(rect.top<viewportHeight&&rect.bottom>0&&rect.left<viewportWidth&&rect.right>0);if(!isInViewport){return false;}
let parent=el.parentElement;while(parent&&parent!==document.body){const parentRect=parent.getBoundingClientRect();const parentStyle=window.getComputedStyle(parent);const hasOverflow=parentStyle.overflow==='auto'||parentStyle.overflow==='scroll'||parentStyle.overflowY==='auto'||parentStyle.overflowY==='scroll'||parentStyle.overflowX==='auto'||parentStyle.overflowX==='scroll';if(hasOverflow){const isAboveParent=rect.top<parentRect.top;const isBelowParent=rect.bottom>parentRect.bottom;const isLeftOfParent=rect.left<parentRect.left;const isRightOfParent=rect.right>parentRect.right;if(isAboveParent||isBelowParent||isLeftOfParent||isRightOfParent){return false;}}
parent=parent.parentElement;}
return true;}
function findScrollContainer(element){let parent=element.parentElement;while(parent&&parent!==document.body){const style=window.getComputedStyle(parent);const hasOverflow=style.overflow==='auto'||style.overflow==='scroll'||style.overflowY==='auto'||style.overflowY==='scroll'||style.overflowX==='auto'||style.overflowX==='scroll';if(hasOverflow){return parent;}
parent=parent.parentElement;}
return null;}
function scrollIntoViewIfNeeded(element,callback){if(isElementInViewport(element)){callback();return;}
const scrollContainer=findScrollContainer(element);const elementRect=element.getBoundingClientRect();if(scrollContainer){const containerRect=scrollContainer.getBoundingClientRect();const scrollTop=scrollContainer.scrollTop;const scrollLeft=scrollContainer.scrollLeft;let targetScrollTop=scrollTop;let targetScrollLeft=scrollLeft;if(elementRect.top<containerRect.top){targetScrollTop=scrollTop-(containerRect.top-elementRect.top)-10;}else if(elementRect.bottom>containerRect.bottom){targetScrollTop=scrollTop+(elementRect.bottom-containerRect.bottom)+10;}
if(elementRect.left<containerRect.left){targetScrollLeft=scrollLeft-(containerRect.left-elementRect.left)-10;}else if(elementRect.right>containerRect.right){targetScrollLeft=scrollLeft+(elementRect.right-containerRect.right)+10;}
scrollContainer.scrollTo({top:targetScrollTop,left:targetScrollLeft,behavior:'smooth'});waitForScrollEnd(scrollContainer,callback);}else{element.scrollIntoView({behavior:'smooth',block:'center',inline:'center'});waitForScrollEnd(document.documentElement,callback);}}
function waitForScrollEnd(scrollElement,callback){let lastScrollTop=scrollElement.scrollTop;let lastScrollLeft=scrollElement.scrollLeft;let stableCount=0;const STABLE_FRAMES_NEEDED=3;const MAX_WAIT_TIME=1000;let startTime=Date.now();let rafId=null;function checkScrollEnd(){if(Date.now()-startTime>MAX_WAIT_TIME){if(rafId){cancelAnimationFrame(rafId);rafId=null;}
callback();return;}
const currentScrollTop=scrollElement.scrollTop;const currentScrollLeft=scrollElement.scrollLeft;if(currentScrollTop===lastScrollTop&&currentScrollLeft===lastScrollLeft){stableCount++;if(stableCount>=STABLE_FRAMES_NEEDED){if(rafId){cancelAnimationFrame(rafId);rafId=null;}
callback();return;}}else{stableCount=0;lastScrollTop=currentScrollTop;lastScrollLeft=currentScrollLeft;}
rafId=requestAnimationFrame(checkScrollEnd);}
rafId=requestAnimationFrame(checkScrollEnd);}
function initOverlay(){if(overlayInitialized){return;}
if(!overlayElement){overlayElement=document.createElement('div');overlayElement.className=CONFIG.OVERLAY_CLASS;overlayElement.style.position='fixed';overlayElement.style.top='0';overlayElement.style.left='0';overlayElement.style.width='100%';overlayElement.style.height='100%';overlayElement.style.zIndex='9998';overlayElement.style.pointerEvents='none';document.body.appendChild(overlayElement);}
const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('class',CONFIG.OVERLAY_CLASS+'-svg');svg.style.position='fixed';svg.style.top='0';svg.style.left='0';svg.style.width='100%';svg.style.height='100%';svg.style.zIndex='9998';svg.style.pointerEvents='none';const defs=document.createElementNS('http://www.w3.org/2000/svg','defs');const mask=document.createElementNS('http://www.w3.org/2000/svg','mask');mask.setAttribute('id','guide-mask');const whiteRect=document.createElementNS('http://www.w3.org/2000/svg','rect');whiteRect.setAttribute('fill','white');whiteRect.setAttribute('x','0');whiteRect.setAttribute('y','0');whiteRect.setAttribute('width','100%');whiteRect.setAttribute('height','100%');holeRect=document.createElementNS('http://www.w3.org/2000/svg','rect');holeRect.setAttribute('id','guide-hole');holeRect.setAttribute('fill','black');holeRect.setAttribute('x','0');holeRect.setAttribute('y','0');holeRect.setAttribute('width','0');holeRect.setAttribute('height','0');const overlayRect=document.createElementNS('http://www.w3.org/2000/svg','rect');overlayRect.setAttribute('fill','rgba(0, 0, 0, 0.35)');overlayRect.setAttribute('x','0');overlayRect.setAttribute('y','0');overlayRect.setAttribute('width','100%');overlayRect.setAttribute('height','100%');overlayRect.setAttribute('mask','url(#guide-mask)');mask.appendChild(whiteRect);mask.appendChild(holeRect);defs.appendChild(mask);svg.appendChild(defs);svg.appendChild(overlayRect);overlayElement.appendChild(svg);overlayInitialized=true;}
function updateOverlay(){if(!highlightElement||!holeRect)return;const rect=highlightElement.getBoundingClientRect();holeRect.setAttribute('x',rect.left);holeRect.setAttribute('y',rect.top);holeRect.setAttribute('width',rect.width);holeRect.setAttribute('height',rect.height);overlayElement.style.display='block';}
function removeHighlight(){if(throttledUpdateOverlay){window.removeEventListener('resize',throttledUpdateOverlay);window.removeEventListener('scroll',throttledUpdateOverlay,true);throttledUpdateOverlay=null;}
highlightElement=null;if(overlayElement){overlayElement.style.display='none';}
if(mutationObserver){mutationObserver.disconnect();mutationObserver=null;}
if(conditionObserver){conditionObserver.disconnect();conditionObserver=null;}
if(conditionTimeoutId){clearTimeout(conditionTimeoutId);conditionTimeoutId=null;}
if(waitTimer){clearInterval(waitTimer);waitTimer=null;}
if(conditionTimer){clearInterval(conditionTimer);conditionTimer=null;}}
function showGuideBox(step,targetElement){const buttons=[];const stepNumber=currentStepIndex+1;const totalSteps=steps.length;const stepInfo=' ('+stepNumber+'/'+totalSteps+')';if(currentStepIndex>0){buttons.push({text:'上一步',class:'btn-secondary',onClick:function(){previousStep();}});}
const isLastStep=currentStepIndex===steps.length-1;buttons.push({text:isLastStep?'完成':'下一步',class:'btn-primary',onClick:function(){nextStep();}});if(!isLastStep){buttons.push({text:'跳过引导',class:'btn-link',onClick:function(){completeGuide();hideGuideBox();removeHighlight();}});}
messageModule.show({title:step.title+stepInfo,content:step.content,showCancel:false,showClose:false,target:targetElement,position:step.position||'auto',offset:15,isHtml:true,customButtons:buttons});}
function hideGuideBox(){messageModule.hide();}
function handleActionBeforeGuide(step,actionElement){simulateClick(actionElement);if(step.actionUrl){if(!isUrlSafe(step.actionUrl)){console.error('guideModule: 不安全的跳转URL '+step.actionUrl);nextStep();return;}
const currentIndex=steps.findIndex(function(s){return s.id===step.id;});if(currentIndex>=0&&currentIndex<steps.length-1){const nextStepObj=steps[currentIndex+1];localStorage.setItem(CONFIG.STORAGE_KEY_CURRENT_STEP,nextStepObj.id);localStorage.setItem(CONFIG.STORAGE_KEY_CURRENT_PAGE,normalizePath(nextStepObj.page||step.actionUrl));}else{localStorage.removeItem(CONFIG.STORAGE_KEY_CURRENT_STEP);localStorage.removeItem(CONFIG.STORAGE_KEY_CURRENT_PAGE);}
setTimeout(function(){window.location.href=step.actionUrl;},100);}else if(step.waitForSelector&&step.waitForSelector.length>0){const selectorToWait=step.waitForSelector;waitForCondition(selectorToWait,function(){setTimeout(function(){waitForElement(step.target,function(element){if(!element){console.warn('guideModule: 未找到目标元素 '+step.target);nextStep();return;}
highlightTarget(element,function(){showGuideBox(step,element);});});},300);});}else{setTimeout(function(){waitForElement(step.target,function(element){if(!element){console.warn('guideModule: 未找到目标元素 '+step.target);nextStep();return;}
highlightTarget(element,function(){showGuideBox(step,element);});});},500);}}
function simulateClick(element){const eventInit={bubbles:true,cancelable:true,view:window};const events=[new MouseEvent('mousedown',eventInit),new MouseEvent('mouseup',eventInit),new MouseEvent('click',eventInit)];events.forEach(function(event){element.dispatchEvent(event);});return true;}
function waitForCondition(selectorCondition,callback){if(conditionObserver){conditionObserver.disconnect();conditionObserver=null;}
if(conditionTimeoutId){clearTimeout(conditionTimeoutId);conditionTimeoutId=null;}
const element=safeQuerySelector(selectorCondition);if(element){callback();return;}
let found=false;function cleanup(){if(conditionObserver){conditionObserver.disconnect();conditionObserver=null;}
if(conditionTimeoutId){clearTimeout(conditionTimeoutId);conditionTimeoutId=null;}}
conditionObserver=new MutationObserver(function(){if(found)return;const el=safeQuerySelector(selectorCondition);if(el){found=true;cleanup();callback();}});conditionObserver.observe(document.body||document.documentElement,{childList:true,subtree:true});conditionTimeoutId=setTimeout(function(){if(!found){found=true;cleanup();console.warn('guideModule: 等待条件超时: '+selectorCondition);callback();}},CONFIG.WAIT_FOR_ELEMENT_TIMEOUT);}
function nextStep(){hideGuideBox();removeHighlight();currentStepIndex++;if(currentStepIndex>=steps.length){finishGuide();}else{let nextStepObj=steps[currentStepIndex];const currentPage=normalizePath(window.location.pathname);const nextPage=normalizePath(nextStepObj.page||currentPage);if(nextPage!==currentPage){localStorage.setItem(CONFIG.STORAGE_KEY_CURRENT_STEP,nextStepObj.id);localStorage.setItem(CONFIG.STORAGE_KEY_CURRENT_PAGE,nextPage);window.location.href=nextPage;}else{localStorage.setItem(CONFIG.STORAGE_KEY_CURRENT_STEP,nextStepObj.id);showStep(nextStepObj);}}}
function previousStep(){hideGuideBox();removeHighlight();currentStepIndex--;if(currentStepIndex<0){currentStepIndex=0;}
let prevStep=steps[currentStepIndex];const currentPage=normalizePath(window.location.pathname);const prevPage=normalizePath(prevStep.page||currentPage);if(prevPage!==currentPage){localStorage.setItem(CONFIG.STORAGE_KEY_CURRENT_STEP,prevStep.id);localStorage.setItem(CONFIG.STORAGE_KEY_CURRENT_PAGE,prevPage);window.location.href=prevPage;}else{localStorage.setItem(CONFIG.STORAGE_KEY_CURRENT_STEP,prevStep.id);showStep(prevStep);}}
function finishGuide(){hideGuideBox();removeHighlight();completeGuide();messageModule.show({title:'引导完成',content:'新手引导已完成！',showCancel:false,confirmText:'开始使用',onConfirm:()=>{messageModule.hide();isGuideActive=false;},});}
function resetGuide(){localStorage.removeItem(CONFIG.STORAGE_KEY_COMPLETED);localStorage.removeItem(CONFIG.STORAGE_KEY_SKIPPED);localStorage.removeItem(CONFIG.STORAGE_KEY_CURRENT_STEP);localStorage.removeItem(CONFIG.STORAGE_KEY_CURRENT_PAGE);sessionStorage.removeItem(CONFIG.SESSION_KEY_PROMPT_SHOWN_PAGE);isGuideActive=false;currentStepIndex=0;highlightElement=null;removeHighlight();unbindEvents();}
return{registerSteps:registerSteps,start:start,startFrom:startFrom,reset:resetGuide,skip:skipGuide};})();;(()=>{'use strict';document.addEventListener('DOMContentLoaded',init);const CONFIG={HOME_PAGE:'/',LIUYAO_PAGE:'/liuyao/',LIUREN_PAGE:'/liuren/',QIMEN_PAGE:'/qimen/',SQUARE_PAGE:'/case-square/',};function normalizePath(path){if(!path||path===''){return'/';}
if(path.length>1&&path.endsWith('/')){return path.slice(0,-1);}
return path;}
const homeSteps=[{id:'index-1',target:'#logo',title:'欢迎来到灵爻妙解',content:'这是一个运用了ai agent、工作流、知识库、mcp服务的专业解读平台，提供六爻、六壬、奇门遁甲等传统预测服务。',position:'bottom',page:CONFIG.HOME_PAGE},{id:'home-2',target:'#logo',title:'功能导航菜单',content:'这里包含了所有主要功能入口,'+'<br>点击【灵爻妙解】的图标，可唤出左侧抽屉菜单进行页面跳转。',position:'auto',action:"click",actionTarget:"#logo",page:CONFIG.HOME_PAGE},{id:'home-3',target:'#theme-btn',title:'主题切换',content:'这是主题切换按钮，'+'<br>点击可切换两种主题。'+'<br>您可以根据你的喜好自行切换黑白两种主题',position:'auto',action:"click",actionTarget:"#theme-btn",page:CONFIG.HOME_PAGE},{id:'home-4',target:'#notice-btn',title:'公告中心',content:'这里是公告中心，'+'<br>如果网站有重要的变动会在此处进行通知。',position:'auto',action:"click",actionTarget:"#theme-btn",page:CONFIG.HOME_PAGE},{id:'home-5',target:'#logout-menu',title:'登陆与注册',content:'这里是登陆、注册、用户名显示区域。'+'<br>登陆后将会变成你的用户名，点击用户名按钮可以唤出个人相关的菜单。'+'<br>签到、邀请、个人卦例、余额显示等都可以通过唤出个人菜单直接跳转。',position:'auto',page:CONFIG.HOME_PAGE},{id:'home-6',target:'#xiaolinger',title:'小灵儿入口',content:'这里是小灵儿会话模式入口。'+'<br>如果你对六爻六壬奇门太乙完全不不了解。'+'<br>推荐直接使用小灵儿会话模式。'+'<br>如果你懂，则推荐从后面入口直接进入,'+'<br>能自定义排盘，且速度更快',position:'auto',page:CONFIG.HOME_PAGE},{id:'home-7',target:'#liuyao_card',title:'六爻入口',content:'六爻如同“占卜快照”，擅长解答具体的单一问题。'+'<br><strong>核心特点是：问题具体、答案明确、时效性强。</strong>'+'<br>✓ 结果有清晰的吉凶成败判断。'+'<br>✓ 可预测短期内事情的发展和时间。'+'<br>✓ 能看事情的大致走向和结果。'+'<br><strong>适合提问：</strong>'+'<br>• 我这次面试能通过吗？'+'<br>• 丢失的物品能找到吗？大概在哪里？'+'<br>• 这次投资是赚是赔？'+'<br>• 我近期身体某处不适，原因是什么？'+'<br>• 我今年的整体运势如何？',position:'auto',page:CONFIG.HOME_PAGE},{id:'home-8',target:'#liuren_card',title:'大六壬入口',content:'大六壬被称为“人事之王”，如同“人事显微镜”，擅长剖析事情复杂的过程、细节和人际关系。'+'<br><strong>核心特点是：细腻如丝、过程清晰、擅长归因。</strong>'+'<br>✓ 能层层推演事件发展的完整链条和细节。'+'<br>✓ 特别擅长分析人际关系、幕后隐情和多方互动。'+'<br>✓ 能精准定位问题根源和关键人物。'+'<br><strong>适合提问：</strong>'+'<br>• 这件事背后到底有哪些人在推动？各自是什么态度？'+'<br>• 这个合作项目，推进过程中会遇到哪些具体环节的困难？'+'<br>• 我与某人的关系未来会如何演变？症结在哪里？'+'<br>• 这笔复杂的交易或官司，其过程和最终结局细节如何？'+'<br>• 寻找最佳的出行、交涉、谈判的具体方案和时间。',position:'auto',page:CONFIG.HOME_PAGE},{id:'home-9',target:'#qimen_card',title:'奇门遁甲入口',content:'奇门遁甲是“时空战略模型”，如同“战略沙盘”，擅长在具体时间和空间维度上，进行最优选择和运筹布局。'+'<br><strong>核心特点是：融合时空、重在决策、利于谋划。</strong>'+'<br>✓ 结合具体时间和方位，分析能量场优劣。'+'<br>✓ 用于选择最佳时间、最佳方位、最佳策略来采取行动。'+'<br>✓ 在竞争、谈判、寻找机遇等主动谋划方面优势突出。'+'<br><strong>适合提问：</strong>'+'<br>• 我应该选择哪个城市或哪个方位发展更有利？'+'<br>• 谈判/签约，选在哪天哪个时辰、面向哪个方向最有利？'+'<br>• 面对竞争，我应采取何种策略来出奇制胜？'+'<br>• 寻找人或事物，去哪个方向、用什么方法最容易成功？'+'<br>• 想提升财运/事业，如何进行风水或行动上的布局？',position:'auto',page:CONFIG.HOME_PAGE},{id:'home-10',target:'#taiyi_card',title:'太乙神数入口【开发中】',content:'太乙神数被称为“高层战略模型”，如同<strong>企业战略雷达</strong>，擅长洞察<strong>行业周期、组织气运与长期大势</strong>。'+'<br><strong>核心特点是：格局宏大、洞见先机、把握周期。</strong>'+'<br>✓ 侧重分析行业、公司、大型团队的长期发展趋势和转折点。'+'<br>✓ 用于观测市场风向、组织气运、重大项目（如并购、上市）的宏观成败轨迹。'+'<br>✓ 在复杂局势中，预判整体吉凶和未来几年的关键窗口期。'+'<br><strong>适合提问（人事与商业战略层面）：</strong>'+'<br>• 我们行业未来三年的发展周期和机遇点在哪里？'+'<br>• 公司明年的整体气运如何？应注意哪些系统性风险？'+'<br>• 这个大型项目（如IPO、战略转型）的长期成败趋势如何？'+'<br>• 团队或组织未来一年是否会出现大的动荡或变革？'+'<br>• 从长远看，我所在的企业/部门，其发展轨迹和兴衰时机如何？',position:'auto',page:CONFIG.HOME_PAGE},{id:'home-11',target:'#liuyao_card',title:'进入六爻功能',content:'现在让我们点击六爻卡片，去体验六爻占卜功能。\n\n点击"下一步"将自动跳转到六爻页面。',position:'auto',page:CONFIG.HOME_PAGE},{id:'home-12',target:'#liuyao_card',title:'六爻功能介绍',content:'六爻功能，是使用六爻占卜的入口。\n\n点击"下一步"将自动跳转到六爻页面。',position:'auto',action:"click",actionTarget:'#liuyao_card',actionUrl:'/liuyao',page:CONFIG.HOME_PAGE},];const liuyaoSteps=[{id:'liuyao-1',target:'#main-panel',title:'六爻占卜',content:'六爻是中国古代占卜方法之一，通过摇卦得出六个爻，根据五行生克制断吉凶。<br>这里可以进行专业的六爻排盘和解读。',position:'right',page:CONFIG.LIUYAO_PAGE},{id:'liuyao-2',target:'#person-info',title:'基础信息输入',content:'这是基础信息输入部分，需要您输入一些必要的参数才能进行起卦。'+'<br>有必填与选填，选填的内容不影响解读的功能，只稍微影响解读的适配性； '+'<br>建议都填写完整。'+'<br>特别注意占问问题部分，一个清晰且明确的问题是最重要的。',position:'auto',page:CONFIG.LIUYAO_PAGE},{id:'liuyao-2-1',target:'#question',title:'占问问题',content:'这是占问问题输入框，'+'<br> <strong>请注意</strong>'+'<br> <strong>请尽可能输入清晰且指向明确的问题</strong>'+'<br> <strong>比如：我什么时候能有另一半？</strong>'+'<br> <strong>我的当前的事业值得一直持续下去吗？</strong>'+'<br> <strong>【无需输入复杂的背景描述！后端的工作流会自动针对清晰的问题进行推理处理】</strong>'+'<br> <strong>本站非api套壳型技术，无需你描述你问题的来源背景等一切不必要的东西。</strong>',position:'auto',page:CONFIG.LIUYAO_PAGE},{id:'liuyao-3',target:'#agent',title:'解读风格选择',content:'这是解读风格选择<br>点击可选择不同的工作流进行解读。<br>每一个风格选项背后，都是一个精心调试过的工作流；'+'<br>现在六爻拥有：'+'<br>· 专业解析'+'<br>· 爱情、事业、健康、寻物专解',position:'auto',page:CONFIG.LIUYAO_PAGE},{id:'liuyao-4',target:'#agent',title:'风格区别',content:'如果您对六爻比较了解，建议选择专业解读，保留了所有专业术语以及各种古籍的引用原文。'+'<br>如果您对六爻不太了解，仅想知道结果，请选择下面的根据问题分类的专解；'+'<br>这将输出适合普通人看的白话解读。',position:'auto',page:CONFIG.LIUYAO_PAGE},{id:'liuyao-5',target:'#shensha',title:'神煞区域',content:'这是神煞展示区域。<br>在六爻卦象中，神煞通常是解读卦象细节中的必要元素<br>这里展示了常用的十三神煞。',position:'auto',page:CONFIG.LIUYAO_PAGE},{id:'liuyao-6',target:'#gz',title:'干支时间',content:'这是干支时间区域。<br>这也是六爻中的必要元素，在计算旺衰、应期等的时候是必须的。',position:'auto',page:CONFIG.LIUYAO_PAGE},{id:'liuyao-7',target:'#paipan',title:'排盘区域',content:'这是排盘区域。<br>我们将在这里排盘，灵爻妙解使用实时动态排盘技术，任何的参数变化，排盘变化都会实时更新。',position:'auto',page:CONFIG.LIUYAO_PAGE},{id:'liuyao-8',target:'#bengua',title:'本卦区域',content:'这是本卦区域。<br>在这里您可以看到本卦的卦象。'+'<br>本卦的所有爻都是可以直接点击的；'+'<br>点击爻将会在 少阳-少阴-老阳-老阴循环变化。'+'<br>藏卦与变卦会在需要的时候自动显示。',position:'auto',},{id:'liuyao-9',target:'#2yao',title:'手动实时排盘',content:'我们点击了二爻，现在你可以看到盘面已经实时变化了。',position:'auto',action:'click',actionTarget:'#2yao',page:CONFIG.LIUYAO_PAGE},{id:'liuyao-10',target:'#qigua',title:'时空起卦',content:'时空起卦是基于立极派的一种起卦方法。'+'<br> 如果您手中没有硬币或铜钱，也可以通过点击【6次】本按钮进行起卦；'+'<br> 现在引导程序将自动点击一次。',position:'auto',page:CONFIG.LIUYAO_PAGE},{id:'liuyao-11',target:'#qigua',title:'时空起卦',content:'您可以看到，目前盘面已经变化。',position:'auto',action:'click',actionTarget:'#qigua',page:CONFIG.LIUYAO_PAGE},{id:'liuyao-12',target:'#jiegua',title:'解读',content:'当输入完基础信息和排好盘以后，即可点击解读按钮'+'<br>ai将通过你选择的解读风格调用不同的工作流来对卦象进行精准解读',position:'auto',page:CONFIG.LIUYAO_PAGE},{id:'liuyao-13',target:'#chat-panel',title:'解读区域',content:'这里是解读内容展示和部分相关功能展示',position:'auto',page:CONFIG.LIUYAO_PAGE},{id:'liuyao-14',target:'#tips',title:'解读状态指示',content:'在点击解读按钮后，这里可以看到解读的状态',position:'auto',page:CONFIG.LIUYAO_PAGE},{id:'liuyao-15',target:'[data-target="course_page"]',title:'新手教程',content:'当然，如果你不喜欢这种主动引导式教程，也可直接点击此处查看本站的新手教程',action:'click',actionTarget:'[data-target="course_page"]',position:'auto',page:CONFIG.LIUYAO_PAGE},{id:'liuyao-16',target:'[data-target="mapping_page"]',title:'类象查询',content:'为了让部分不想使用ai进行解读的专业道友能快速的查看各种类象 '+'<br>本站将知识库中的类象部分也进行了整理'+'<br>通过左侧的导航条，可方便的进行查找类象',position:'auto',action:'click',actionTarget:'[data-target="mapping_page"]',page:CONFIG.LIUYAO_PAGE},{id:'liuyao-17',target:'[data-target="yijing"]',title:'易经查询',content:'本站还提供了完善的易经原文查询。 '+'<br> 同样，可通过左侧导航条点击卦名，查看易经的爻辞、彖辞、象等;'+'<br> 还可以通过直接在导航条上部的搜索框直接输入卦名进行查询;'+'<br> 当然，还有更方便的方法:'+'<br> <strong>直接点击排盘区域本卦的爻，</strong>等待3秒后此部分也会自动跳转到与本卦相符的卦象处',position:'auto',action:'click',actionTarget:'[data-target="yijing"]',page:CONFIG.LIUYAO_PAGE},{id:'liuyao-18',target:'#reset',title:'重置',content:'这是重置按钮，在解读完成一个卦后，点击重置按钮，将会清空所有内容，恢复默认',position:'auto',page:CONFIG.LIUYAO_PAGE},{id:'liuyao-19',target:'#save',title:'保存',content:'在解读完成后，会展现评分框，然后，您就可以点击保存按钮将此卦象进行保存'+'<br> 保存是保存在云端的，您可以在不同的设备进行查看',position:'auto',page:CONFIG.LIUYAO_PAGE},{id:'liuyao-20',target:'#share',title:'分享',content:'在解读完成后，您可以点击此按钮，将本卦进行分享 '+'<br> 分享后会自动复制分享链接到剪贴板，所有人都可以通过此链接进行访问此卦 '+'<br> 同时，卦例也会展现在卦例广场当中',position:'auto',page:CONFIG.LIUYAO_PAGE},{id:'liuyao-21',target:'#share',title:'大六壬排盘',content:'六爻排盘与解读引导已完成。'+'<br>现在，让我们去看看大六壬是如何工作的。',position:'auto',page:CONFIG.LIUYAO_PAGE},{id:'liuyao-22',target:'#menu-area a[href="/liuren"]',title:'六爻排盘',content:'六爻排盘与解读引导已完成。',position:'auto',action:'click',actionTarget:'#menu-area a[href="/liuren"]',actionUrl:'/liuren',page:CONFIG.LIUYAO_PAGE}];const liurenSteps=[{id:'liuren-1',target:'#main-panel',title:'大六壬占卜',content:'大六壬占卜也是传承千年的占卜方式，被称之为三式之首，主要是用于人事。'+'<br>本站的排盘方法为正时排盘+活时排盘；'+'<br>当您进入本页面时，就已经基于当前时间排好盘了。'+'<br>如需活时排盘，只需要点击一次活时起卦即可。'+'<br>您可以看到，整个页面的布局与六爻一致，所以操作逻辑也是一致的。',position:'auto',page:CONFIG.LIUREN_PAGE},{id:'liuren-2',target:'#person-info',title:'基础信息输入',content:'这是基础信息输入部分，需要您输入一些必要的参数才能进行起卦。'+'<br>有必填与选填，选填的内容不影响解读的功能，只稍微影响解读的适配性； '+'<br>建议都填写完整。',position:'auto',page:CONFIG.LIUREN_PAGE},{id:'liuren-3',target:'#question',title:'占问问题',content:'这是占问问题输入框，'+'<br> <strong>请注意</strong>'+'<br> <strong>请尽可能输入清晰且指向明确的问题</strong>'+'<br> <strong>比如：我什么时候能有另一半？</strong>'+'<br> <strong>我的当前的事业值得一直持续下去吗？</strong>'+'<br> <strong>【无需输入复杂的背景描述！后端的工作流会自动针对清晰的问题进行推理处理】</strong>'+'<br> <strong>本站非api套壳型技术，无需你描述你问题的来源背景等一切不必要的东西。</strong>',position:'auto',page:CONFIG.LIUREN_PAGE},{id:'liuren-4',target:'#time',title:'时间选择',content:'如果您需解读一个在其余时间起好的卦象，'+'<br>可直接点击，进行选择起卦时间。'+'<br>此处时间的输入为【国历】',position:'auto',action:'click',actionTarget:'#time',page:CONFIG.LIUREN_PAGE},{id:'liuren-5',target:'#time',title:'时间选择',content:'点击确认，'+'<br>程序将基于选择的时间自动更新排盘。',position:'auto',action:'click',actionTarget:'.p-select-submit-btn',page:CONFIG.LIUREN_PAGE},{id:'liuren-6',target:'#agent',title:'解读风格选择',content:'这是解读风格选择<br>点击可选择不同的工作流进行解读。<br>每一个风格选项背后，都是一个精心调试过的工作流；'+'<br>可选普通流式与集群解读模式。'+'<br>普通流式为单智能体模式，速度快，但可能会偶现幻觉'+'<br>集群模式为24个智能体分不同主题辩论，准确度高，速度慢。',position:'auto',page:CONFIG.LIUREN_PAGE},{id:'liuren-7',target:'#agent',title:'风格区别',content:'同样，大六壬的专业解读，保留了所有专业术语以及各种古籍的引用原文。'+'<br>如果您对大六壬不太了解，可能会有部分内容看不懂，但是不影响；'+'<br>您只需关注你能看懂的部分也足够。'+'<br>其余的专业术语部分是针对于专业人士，可根据解读自行拓展更多内容用的。',position:'auto',page:CONFIG.LIUREN_PAGE},{id:'liuren-8',target:'#ganzhi-card',title:'干支时间',content:'这是当前排盘的干支时间显示卡片。',position:'auto',page:CONFIG.LIUREN_PAGE},{id:'liuren-9',target:'#sanchuan-card',title:'三传四课',content:'这是当前排盘的三传四课，我们解读占比权重很大的一部分。',position:'auto',page:CONFIG.LIUREN_PAGE},{id:'liuren-10',target:'#tiandipan-card',title:'大六壬盘面',content:'这是详细的排盘，星宿、天将、天地神盘都可以在这里详细的看到。',position:'auto',page:CONFIG.LIUREN_PAGE},{id:'liuren-11',target:'#jiegua',title:'解读',content:'当输入完基础信息和排好盘以后，即可点击解读按钮，'+'<br>ai将通过你选择的解读风格调用不同的工作流来对卦象进行精准解读。',position:'auto',page:CONFIG.LIUREN_PAGE},{id:'liuren-12',target:'#main-panel',title:'总结',content:'这便是本站极致精简后的大六壬占卜流程：'+'<br>如果您在注册时已经填写了选填的参数，'+'<br>那么理论上，您只需要填写问题，点击解读即可。'+'<br>后端程序会自动根据您提供的信息与大六壬盘面进行精准解读',position:'auto',page:CONFIG.LIUREN_PAGE},{id:'liuren-13',target:'#chat-panel',title:'解读区域',content:'这里是解读内容展示和部分相关功能展示'+'<br> 您可以看到，这部分与六爻几乎相同，功能也基本一致，'+'<br> 拥有类象查询、重置盘面、保存、分享等功能。'+'<br> 这里就不过多赘述了。'+'<br> 接下来我们一起去看看奇门遁甲。',position:'auto',page:CONFIG.LIUREN_PAGE},{id:'liuren-14',target:'#chat-panel',title:'解读区域',content:'这里是解读内容展示和部分相关功能展示'+'<br> 您可以看到，这部分与六爻几乎相同，功能也基本一致，'+'<br> 拥有类象查询、重置盘面、保存、分享等功能。'+'<br> 这里就不过多赘述了。'+'<br> 接下来我们一起去看看奇门遁甲。',position:'auto',action:'click',actionTarget:'#menu-area a[href="/qimen"]',actionUrl:'/qimen',page:CONFIG.LIUREN_PAGE},];const qimenSteps=[{id:'qimen-1',target:'#main-panel',title:'奇门遁甲',content:'奇门遁甲也属于预测中的三式之一，曾经主要运用在军事与风水中。'+'<br>本站的排盘方法为 时家转盘奇门。'+'<br>在人事预测中，更加擅长于从大环境来推算一件事情的走向。',position:'auto',page:CONFIG.QIMEN_PAGE},{id:'qimen-2',target:'#person-info',title:'基础信息输入',content:'这是基础信息输入部分，需要您输入一些必要的参数才能进行起卦。'+'<br>有必填与选填，选填的内容不影响解读的功能，只稍微影响解读的适配性； '+'<br>建议都填写完整。',position:'auto',page:CONFIG.QIMEN_PAGE},{id:'qimen-3',target:'#question',title:'基础信息输入',content:'这是占问问题输入框，'+'<br> <strong>请注意</strong>'+'<br> <strong>请尽可能输入清晰且指向明确的问题</strong>'+'<br> <strong>比如：我什么时候能有另一半？</strong>'+'<br> <strong>我的当前的事业值得一直持续下去吗？</strong>'+'<br> <strong>【无需输入复杂的背景描述！后端的工作流会自动针对清晰的问题进行推理处理】</strong>'+'<br> <strong>本站非api套壳型技术，无需你描述你问题的来源背景等一切不必要的东西。</strong>',position:'auto',page:CONFIG.QIMEN_PAGE},{id:'qimen-4',target:'#time',title:'时间选择',content:'如果您需解读一个在其余时间起好的卦象，'+'<br>可直接点击，进行选择起卦时间。'+'<br>此处时间的输入为【国历】',position:'auto',action:'click',actionTarget:'#time',page:CONFIG.QIMEN_PAGE},{id:'qimen-5',target:'#time',title:'时间选择',content:'点击确认，'+'<br>程序将基于选择的时间自动更新排盘。',position:'auto',action:'click',actionTarget:'.p-select-submit-btn',page:CONFIG.QIMEN_PAGE},{id:'qimen-6',target:'#agent',title:'解读风格选择',content:'这是解读风格选择<br>点击可选择不同的工作流进行解读。<br>每一个风格选项背后，都是一个精心调试过的工作流；'+'<br>可选普通流式与集群解读模式。'+'<br>普通流式为单智能体模式，速度快，但可能会偶现幻觉'+'<br>集群模式为多个智能体分不同主题辩论，准确度高，速度慢。',position:'auto',page:CONFIG.QIMEN_PAGE},{id:'qimen-7',target:'#agent',title:'风格区别',content:'同样，奇门遁甲的专业解读，保留了所有专业术语以及各种古籍的引用原文。'+'<br>如果您对奇门遁甲不太了解，可能会有部分内容看不懂，但是不影响；'+'<br>您只需关注你能看懂的部分也足够。'+'<br>其余的专业术语部分是针对于专业人士，可根据解读自行拓展更多内容用的。',position:'auto',page:CONFIG.QIMEN_PAGE},{id:'qimen-8',target:'#ganzhi-card',title:'干支时间',content:'这是当前排盘的干支时间显示卡片。',position:'top',page:CONFIG.QIMEN_PAGE},{id:'qimen-9',target:'#ju-card',title:'盘局信息',content:'这里展示的是当前奇门排盘的盘局信息。',position:'top',page:CONFIG.QIMEN_PAGE},{id:'qimen-10',target:'#paipan',title:'详细排盘',content:'这里展示的是当前奇门排盘的详细信息。'+'<br>使用了新手友好的信息展示方法。'+'<br>大部分市面上未展示的隐藏信息，均完整显示。',position:'top',page:CONFIG.QIMEN_PAGE},{id:'qimen-11',target:'#jiegua',title:'解读',content:'这是解读按钮，'+'<br>当输入完基础信息和排好盘以后，即可点击解读按钮进行解读，'+'<br>ai将通过你选择的解读风格调用不同的工作流来对卦象进行精准解读。',position:'auto',page:CONFIG.QIMEN_PAGE},{id:'qimen-12',target:'#main-panel',title:'总结',content:'这便是本站极致精简后的奇门遁甲占卜流程：'+'<br>如果您在注册时已经填写了选填的参数，'+'<br>那么理论上，您只需要填写问题，点击解读即可。'+'<br>后端程序会自动根据您提供的信息与奇门遁甲的盘面进行精准解读。',position:'auto',page:CONFIG.QIMEN_PAGE},{id:'qimen-13',target:'#chat-panel',title:'解读区域',content:'这里是解读内容展示和部分相关功能展示'+'<br> 您可以看到，这部分与六爻、大六壬几乎相同，功能也基本一致，'+'<br> 拥有新手引导、类象查询、重置盘面、保存、分享等功能。'+'<br> 这里就不过多赘述了。',position:'auto',page:CONFIG.QIMEN_PAGE},];const squareSteps=[{id:'square-intro',target:'#main-panel',title:'卦例广场',content:'卦例广场是 ancient-chinese-astrology 模块提供的一个功能，用于生成随机的卦象和卦解。\n\n这里可以进行专业的卦例广场排盘和解读。',position:'top',page:CONFIG.SQUARE_PAGE},{id:'square-5yao',}]
function init(){document.addEventListener('guideButtonClick',handleGuideButtonClick);const currentPage=normalizePath(window.location.pathname);const savedStepId=localStorage.getItem('guide_current_step');const savedPage=normalizePath(localStorage.getItem('guide_current_page'));if(savedStepId&&savedPage){const allSteps=homeSteps.concat(liuyaoSteps).concat(liurenSteps).concat(qimenSteps);guideModule.registerSteps(allSteps);if(savedPage===currentPage){setTimeout(function(){guideModule.startFrom(savedStepId);},300);}else if(savedPage===normalizePath(CONFIG.HOME_PAGE)&&currentPage===normalizePath(CONFIG.LIUYAO_PAGE)){const firstLiuyaoStep=findNextStepAfter(homeSteps);if(firstLiuyaoStep){setTimeout(function(){guideModule.startFrom(firstLiuyaoStep.id);},300);}else{setTimeout(function(){guideModule.startFrom(savedStepId);},300);}}else if(savedPage===normalizePath(CONFIG.LIUYAO_PAGE)&&currentPage===normalizePath(CONFIG.HOME_PAGE)){setTimeout(function(){guideModule.startFrom(savedStepId);},300);}else{const currentPageStep=allSteps.find(function(s){return normalizePath(s.page)===currentPage;});if(currentPageStep){setTimeout(function(){guideModule.startFrom(savedStepId);},300);}else{console.log('GuideExample: 等待页面跳转，savedPage='+savedPage+', currentPage='+currentPage);}}
return;}
if(currentPage===normalizePath(CONFIG.HOME_PAGE)){guideModule.registerSteps(homeSteps.concat(liuyaoSteps).concat(liurenSteps).concat(qimenSteps));}else if(currentPage===normalizePath(CONFIG.LIUYAO_PAGE)){guideModule.registerSteps(liuyaoSteps);}else if(currentPage===normalizePath(CONFIG.LIUREN_PAGE)){guideModule.registerSteps(liurenSteps);}else if(currentPage===normalizePath(CONFIG.QIMEN_PAGE)){guideModule.registerSteps(qimenSteps);}
else{waitForGuideEnd();}}
function handleGuideButtonClick(){guideModule.reset();const currentPage=normalizePath(window.location.pathname);if(currentPage===normalizePath(CONFIG.HOME_PAGE)){guideModule.registerSteps(homeSteps.concat(liuyaoSteps).concat(liurenSteps).concat(qimenSteps));guideModule.start();}else if(currentPage===normalizePath(CONFIG.LIUYAO_PAGE)){guideModule.registerSteps(liuyaoSteps);guideModule.start();}else if(currentPage===normalizePath(CONFIG.LIUREN_PAGE)){guideModule.registerSteps(liurenSteps);guideModule.start();}else if(currentPage===normalizePath(CONFIG.QIMEN_PAGE)){guideModule.registerSteps(qimenSteps);guideModule.start();}else if(currentPage===normalizePath(CONFIG.SQUARE_PAGE)){guideModule.registerSteps(squareSteps);guideModule.start();}
else{console.log('GuideExample: 当前页面暂无引导内容');messageModule.show({title:'暂无引导',content:'当前页面暂无引导内容，建议您先了解首页功能。',showCancel:false,confirmText:'我知道了',onConfirm:function(){messageModule.hide();}});}}
function findNextStepAfter(stepList){const allSteps=homeSteps.concat(liuyaoSteps).concat(liurenSteps).concat(qimenSteps);const lastStepId=stepList[stepList.length-1].id;const lastIndex=allSteps.findIndex(function(s){return s.id===lastStepId;});if(lastIndex>=0&&lastIndex<allSteps.length-1){return allSteps[lastIndex+1];}
return null;}
function waitForGuideEnd(){const checkInterval=setInterval(function(){const savedStep=localStorage.getItem('guide_current_step');if(!savedStep){clearInterval(checkInterval);}},1000);setTimeout(function(){clearInterval(checkInterval);},5000);}})();;(()=>{'use strict';const SERVICE_WORKER_PATH='/serviceworker.js';const SW_REFRESHED_KEY='sw_has_refreshed';let hasRefreshed=false;function activateWaitingServiceWorker(worker){if(!worker){return;}
worker.postMessage({type:'SKIP_WAITING'});}
function shouldSkipReload(){try{if(sessionStorage.getItem(SW_REFRESHED_KEY)==='1'){return true;}
sessionStorage.setItem(SW_REFRESHED_KEY,'1');return false;}catch(error){if(hasRefreshed){return true;}
hasRefreshed=true;return false;}}
function bindControllerChangeReload(){navigator.serviceWorker.addEventListener('controllerchange',function(){if(shouldSkipReload()){return;}
window.location.reload();});}
function bindRegistrationUpdate(registration){if(registration.waiting){activateWaitingServiceWorker(registration.waiting);}
registration.addEventListener('updatefound',function(){const newWorker=registration.installing;if(!newWorker){return;}
newWorker.addEventListener('statechange',function(){if(newWorker.state==='installed'&&navigator.serviceWorker.controller){activateWaitingServiceWorker(newWorker);}});});}
async function registerServiceWorker(){try{const registration=await navigator.serviceWorker.register(SERVICE_WORKER_PATH);bindRegistrationUpdate(registration);}catch(error){console.log('注册 Service Worker 失败');}}
function init(){if(!('serviceWorker'in navigator)){return;}
bindControllerChangeReload();window.addEventListener('load',registerServiceWorker);}
init();})();;const inputModule=(()=>{document.addEventListener('DOMContentLoaded',async function(){await init();});async function init(){initTime();if(await isLogin()){await initDatePicker('#time');await initDatePicker('#birthday');try{await initLoginInfoInput();}catch(e){console.warn('initLoginInfoInput failed:',e);}}else{await initDatePicker('#time');await initDatePicker('#birthday');}
document.dispatchEvent(new CustomEvent('infoInputModuleReady'));}
function initTime(){const now=new Date();const year=now.getFullYear();const month=String(now.getMonth()+1).padStart(2,'0');const day=String(now.getDate()).padStart(2,'0');const hours=String(now.getHours()).padStart(2,'0');const minutes=String(now.getMinutes()).padStart(2,'0');const seconds=String(now.getSeconds()).padStart(2,'0');document.getElementById('time').value=`${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;}
function initDatePicker(elemId){return popoPicker.dateTime(elemId,{display:'auto',position:'bottom-left',date:true,time:true,format:'YYYY-MM-DD HH:mm:ss',save:(result,target)=>{target.setAttribute('value',result);target.value=result;target.dispatchEvent(new Event('change',{bubbles:true}));}})}
async function initLoginInfoInput(){const data=await getUserInfo();if(data.success){const name=document.getElementById('name');const gender=document.getElementById('gender');const birthday=document.getElementById('birthday');const identity=document.getElementById('identity');const time=document.getElementById('time');if(!name.value.trim()){name.value=data.username||'';}
if(!gender.value){gender.value=data.gender||'男';}
if(data.birthday){birthday.value=data.birthday;}else{birthday.value='';}
if(!identity.value.trim()){identity.value=String(data.identity||'').trim()||'未知';}
time.value=getNowTime();}else{messageModule.error('获取用户信息失败',data.message);}}
function getNowTime(){const now=new Date();const year=now.getFullYear();const month=String(now.getMonth()+1).padStart(2,'0');const day=String(now.getDate()).padStart(2,'0');const hours=String(now.getHours()).padStart(2,'0');const minutes=String(now.getMinutes()).padStart(2,'0');const seconds=String(now.getSeconds()).padStart(2,'0');return`${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;}
async function getUserInfo(){const response=await fetch('/account/api/user_info/',{method:'GET',headers:{'X-Requested-With':'XMLHttpRequest','Content-Type':'application/json','X-CSRFToken':getCookie('csrftoken')}});return await response.json();}
return{init,}})();;(()=>{'use strict';document.addEventListener('DOMContentLoaded',initAppraisePanel);function initAppraisePanel(){initAppraiseSwitchState();initAppraiseRating();initAppraiseListener();}
function initAppraiseSwitchState(){const isOpenBtn=document.getElementById('case-is-open');if(!isOpenBtn){return;}
const isOpen=isOpenBtn.getAttribute('data-open')==='True';const switchKnob=document.getElementById('appraise-switch-knob');const switchLabel=document.getElementById('appraise-switch-label');if(isOpen){isOpenBtn.classList.add('active');switchKnob.classList.add('active');switchLabel.classList.add('active');switchLabel.innerText='公开';}else{isOpenBtn.classList.remove('active');switchKnob.classList.remove('active');switchLabel.classList.remove('active');switchLabel.innerText='私密';}}
function initAppraiseRating(){const ratingInput=document.getElementById('appraise-rating-input');const ratingValueDisplay=document.getElementById('rating-value-display');if(!ratingInput){return;}
ratingInput.value=8.0;ratingInput.setAttribute('value','8.0');if(ratingValueDisplay){ratingValueDisplay.textContent='8.0';}}
function initAppraiseListener(){const ratingSlider=document.getElementById('appraise-rating-input');const ratingValueDisplay=document.getElementById('rating-value-display');const isOpenBtn=document.getElementById('case-is-open');if(!ratingSlider||!ratingValueDisplay||!isOpenBtn){return;}
isOpenBtn.addEventListener('click',toggleIsOpen);ratingSlider.addEventListener('input',function(){ratingValueDisplay.textContent=this.value;ratingSlider.setAttribute('value',this.value);});}
function toggleIsOpen(){const isOpenBtn=document.getElementById('case-is-open');const switchKnob=document.getElementById('appraise-switch-knob');const switchLabel=document.getElementById('appraise-switch-label');const isActive=isOpenBtn.classList.contains('active');isOpenBtn.classList.toggle('active');switchKnob.classList.toggle('active');switchLabel.classList.toggle('active');if(!isActive){isOpenBtn.setAttribute('data-open','True');switchLabel.innerText='公开';}else{isOpenBtn.setAttribute('data-open','False');switchLabel.innerText='私密';}}
function resetAppraisePanel(){const isOpenBtn=document.getElementById('case-is-open');if(isOpenBtn){isOpenBtn.setAttribute('data-open','True');}
initAppraiseSwitchState();initAppraiseRating();}
window.appraiseModule={resetAppraisePanel:resetAppraisePanel};})();;(()=>{document.addEventListener('DOMContentLoaded',initCollapsiblePanels);function initCollapsiblePanels(){const collapsibleHeaders=document.querySelectorAll('.collapsible-header');collapsibleHeaders.forEach(header=>{header.addEventListener('click',function(){this.classList.toggle('active');const content=this.nextElementSibling;content.classList.toggle('active');});});const tips=document.getElementById('tips');const agentCloseBtn=document.getElementById('agent-close-btn');if(tips){tips.addEventListener('click',showAgentPanel);}
if(agentCloseBtn){agentCloseBtn.addEventListener('click',hideAgentPanel);}}
function showAgentPanel(){const agentPanel=document.getElementById('agent-panel');if(agentPanel){agentPanel.classList.add('active')}}
function hideAgentPanel(){const agentPanel=document.getElementById('agent-panel');if(agentPanel){agentPanel.classList.remove('active');}}})();;(()=>{document.addEventListener('DOMContentLoaded',initSwitchTabs);function initSwitchTabs(){const tabs=document.querySelectorAll('.chat-panel-tabs .tab');let currentActiveIndex=0;tabs.forEach((tab,index)=>{if(tab.classList.contains('active')){currentActiveIndex=index;}});tabs.forEach((tab,index)=>{tab.addEventListener('click',()=>handleTabClick(tab,index,tabs));});}
function handleTabClick(clickedTab,tabIndex,allTabs){const target=clickedTab.getAttribute('data-target');if(clickedTab.classList.contains('active')){return;}
const currentActiveIndex=getCurrentActiveIndex(allTabs);const direction=tabIndex>currentActiveIndex?'right':'left';updateTabStates(clickedTab,allTabs);switchContent(target,direction);}
function getCurrentActiveIndex(tabs){for(let i=0;i<tabs.length;i++){if(tabs[i].classList.contains('active')){return i;}}
return 0;}
function updateTabStates(activeTab,tabs){tabs.forEach(tab=>tab.classList.remove('active'));activeTab.classList.add('active');}
function switchContent(target,direction){const activeContent=document.querySelector('.content.active');const targetContent=document.getElementById(target);if(!targetContent||activeContent===targetContent){return;}
const allContents=document.querySelectorAll('.content');allContents.forEach(content=>{content.classList.remove('slideOutLeft','slideOutRight','slideInLeft','slideInRight','prepare-slide-left','prepare-slide-right');});if(direction==='right'){targetContent.classList.add('prepare-slide-right');}else{targetContent.classList.add('prepare-slide-left');}
if(targetContent.tagName==='IFRAME'){if(!targetContent.src){const src=targetContent.getAttribute('data-src')||targetContent.getAttribute('src');if(src){targetContent.src=src;}}
setTimeout(()=>{targetContent.style.width='100%';targetContent.style.height='100%';targetContent.style.border='none';targetContent.style.overflowY='auto';},100);}
requestAnimationFrame(()=>{if(activeContent){if(direction==='right'){activeContent.classList.add('slideOutLeft');}else{activeContent.classList.add('slideOutRight');}
if(direction==='right'){targetContent.classList.add('slideInRight');}else{targetContent.classList.add('slideInLeft');}
activeContent.addEventListener('animationend',function handler(){activeContent.removeEventListener('animationend',handler);activeContent.classList.remove('active','slideOutLeft','slideOutRight');});}
targetContent.addEventListener('animationend',function handler(){targetContent.removeEventListener('animationend',handler);targetContent.classList.remove('slideInLeft','slideInRight','prepare-slide-left','prepare-slide-right');targetContent.classList.add('active');if(targetContent.tagName==='IFRAME'){targetContent.offsetHeight;}});});}})();;let streamRenderer=(()=>{'use strict';const MCP_HTML_PATTERN=/<div\s+class="mcp-(?:result|error)[^"]*">[\s\S]*?<\/div>|<span\s+class="mcp-(?:result|error)[^"]*">[\s\S]*?<\/span>/g;function renderMarkdownSafe(content){if(typeof liuyaoUtils!=='undefined'&&typeof liuyaoUtils.renderMarkdownSafe==='function'){return liuyaoUtils.renderMarkdownSafe(content);}
const mcpFragments=[];const textWithPlaceholders=(content||'').replace(MCP_HTML_PATTERN,function(match){const index=mcpFragments.length;mcpFragments.push(match);return'\n%%MCP_'+index+'%%\n';});const tempDiv=document.createElement('div');tempDiv.textContent=textWithPlaceholders;const escaped=tempDiv.innerHTML;let html;if(typeof marked!=='undefined'&&marked.parse){html=marked.parse(escaped);}else{html=escaped.replace(/\n/g,'<br>');}
for(let i=0;i<mcpFragments.length;i++){html=html.replace('<p>%%MCP_'+i+'%%</p>',mcpFragments[i]);html=html.replace('%%MCP_'+i+'%%',mcpFragments[i]);}
return html;}
const CONFIG={TYPEWRITER_SPEED:10,CHARS_PER_TICK:5,SCROLL_THRESHOLD:100,USER_SCROLL_TIMEOUT:3000};const twContent={};const twPrintedUntil={};const twTimers={};const scrollStates={};const scopeElements={};const scopeAttempts={};function render(eleId,newChunk){if(!eleId||typeof newChunk!=='string'){console.warn('render: 参数无效',{eleId,newChunk});return;}
initScrollListener(eleId);if(!twContent[eleId]){twContent[eleId]='';twPrintedUntil[eleId]=0;}
twContent[eleId]+=newChunk;renderNextTick(eleId);startTypeWriter(eleId);}
function shouldIgnoreAttempt(scopeId,attemptId){if(!attemptId){return false;}
const currentAttempt=Number(scopeAttempts[scopeId]||0);return currentAttempt>0&&Number(attemptId)<currentAttempt;}
function renderElement(scopeId,element,newChunk,options){if(!scopeId||!element||typeof newChunk!=='string'){console.warn('renderElement: 参数无效',{scopeId,element,newChunk});return;}
const renderOptions=options||{};const attemptId=Number(renderOptions.attemptId||0);if(shouldIgnoreAttempt(scopeId,attemptId)){return;}
if(attemptId){scopeAttempts[scopeId]=attemptId;}
scopeElements[scopeId]=element;if(!twContent[scopeId]){twContent[scopeId]='';twPrintedUntil[scopeId]=0;}
twContent[scopeId]+=newChunk;renderNextTick(scopeId,renderOptions);startTypeWriter(scopeId,renderOptions);}
function resetScope(scopeId,attemptId){if(!scopeId){return;}
const nextAttempt=Number(attemptId||0);if(shouldIgnoreAttempt(scopeId,nextAttempt)){return;}
if(nextAttempt){scopeAttempts[scopeId]=nextAttempt;}
_resetScrollState(scopeId);_clearTypeWriter(scopeId);twContent[scopeId]='';twPrintedUntil[scopeId]=0;const element=scopeElements[scopeId];if(element){element.innerHTML='';}}
function flush(eleId){if(!eleId)return;stopTypeWriter(eleId);const ele=document.getElementById(eleId);const fullContent=twContent[eleId]||'';if(ele&&fullContent){twPrintedUntil[eleId]=fullContent.length;ele.innerHTML=renderMarkdownSafe(fullContent);ele.scrollTo({top:ele.scrollHeight,behavior:'smooth'});}}
function setContent(eleId,content){if(!eleId||typeof content!=='string'){console.warn('setContent: 参数无效',{eleId,content});return;}
twContent[eleId]=content;twPrintedUntil[eleId]=content.length;const ele=document.getElementById(eleId);if(ele){ele.innerHTML=renderMarkdownSafe(content);}}
function reset(eleId){if(eleId){_resetScrollState(eleId);_clearTypeWriter(eleId);twContent[eleId]='';twPrintedUntil[eleId]=0;}else{Object.keys(scrollStates).forEach(_resetScrollState);Object.keys(twTimers).forEach(_clearTypeWriter);for(let key in twContent)delete twContent[key];for(let key in twPrintedUntil)delete twPrintedUntil[key];for(let key in scopeElements)delete scopeElements[key];for(let key in scopeAttempts)delete scopeAttempts[key];}}
function clear(eleId){if(!eleId)return;reset(eleId);const ele=document.getElementById(eleId);if(ele){ele.innerHTML='';}}
function startTypeWriter(eleId,options){if(twTimers[eleId])return;const renderOptions=options||{};const ele=scopeElements[eleId]||document.getElementById(eleId);if(!ele)return;twTimers[eleId]=setInterval(()=>{const fullContent=twContent[eleId]||'';const printedUntil=twPrintedUntil[eleId]||0;if(printedUntil>=fullContent.length){stopTypeWriter(eleId);return;}
twPrintedUntil[eleId]=printedUntil+CONFIG.CHARS_PER_TICK;const displayContent=fullContent.slice(0,twPrintedUntil[eleId]);ele.innerHTML=renderMarkdownSafe(displayContent);_smartScroll(ele,eleId);if(typeof renderOptions.onAfterRender==='function'){renderOptions.onAfterRender(ele);}},CONFIG.TYPEWRITER_SPEED);}
function renderNextTick(eleId,options){const renderOptions=options||{};const ele=scopeElements[eleId]||document.getElementById(eleId);if(!ele)return;const fullContent=twContent[eleId]||'';const printedUntil=twPrintedUntil[eleId]||0;if(printedUntil>=fullContent.length){return;}
twPrintedUntil[eleId]=Math.min(printedUntil+CONFIG.CHARS_PER_TICK,fullContent.length);const displayContent=fullContent.slice(0,twPrintedUntil[eleId]);ele.innerHTML=renderMarkdownSafe(displayContent);_smartScroll(ele,eleId);if(typeof renderOptions.onAfterRender==='function'){renderOptions.onAfterRender(ele);}}
function stopTypeWriter(eleId){if(twTimers[eleId]){clearInterval(twTimers[eleId]);twTimers[eleId]=null;}}
function initScrollListener(eleId){if(scrollStates[eleId])return;scrollStates[eleId]={isUserScrolling:false,timer:null};const ele=document.getElementById(eleId);if(!ele)return;ele.addEventListener('scroll',()=>{const state=scrollStates[eleId];state.isUserScrolling=true;if(state.timer){clearTimeout(state.timer);}
state.timer=setTimeout(()=>{state.isUserScrolling=false;},CONFIG.USER_SCROLL_TIMEOUT);});}
function _smartScroll(ele,eleId){const state=scrollStates[eleId];if(!state||!state.isUserScrolling){if(ele.scrollHeight-ele.scrollTop-ele.clientHeight<CONFIG.SCROLL_THRESHOLD){ele.scrollTo({top:ele.scrollHeight,behavior:'smooth'});}}}
function _resetScrollState(eleId){if(scrollStates[eleId]){if(scrollStates[eleId].timer){clearTimeout(scrollStates[eleId].timer);}
scrollStates[eleId]={isUserScrolling:false,timer:null};}}
function _clearTypeWriter(eleId){if(twTimers[eleId]){clearInterval(twTimers[eleId]);twTimers[eleId]=null;}}
return{render,renderElement,resetScope,flush,setContent,reset,clear,};})();;const liurenUI=(()=>{'use strict';const initialAgentPanelHtml=document.getElementById('agent-panel')?.innerHTML||'';let isAgentPanelDismissedByUser=false;function getButtons(){return{jiegua:document.getElementById('jiegua'),reset:document.getElementById('reset'),save:document.getElementById('save'),share:document.getElementById('share')};}
function setBtnState(state){const buttons=getButtons();const states={loading:{jiegua:{disabled:false,class:'remove:disabled',text:'取消'},reset:{disabled:true,class:'add:disabled'},save:{disabled:true,class:'add:disabled'},share:{disabled:true,class:'add:disabled'}},cancelling:{jiegua:{disabled:true,class:'add:disabled',text:'取消中...'},reset:{disabled:true,class:'add:disabled'},save:{disabled:true,class:'add:disabled'},share:{disabled:true,class:'add:disabled'}},enable:{jiegua:{disabled:false,class:'remove:disabled',text:'解读'},reset:{disabled:false,class:'remove:disabled'},save:{disabled:true,class:'add:disabled',text:'保存'},share:{disabled:true,class:'add:disabled',text:'分享'}},success:{jiegua:{disabled:true,class:'add:success',text:'已解读'},reset:{disabled:false,class:'remove:disabled'},save:{disabled:false,class:'remove:disabled'},share:{disabled:true,class:'add:disabled',text:'分享'}}};const config=states[state];if(!config)return;Object.entries(config).forEach(([key,settings])=>{const btn=buttons[key];if(!btn)return;btn.disabled=settings.disabled;if(settings.text)btn.innerHTML=settings.text;const[action,className]=settings.class.split(':');if(action==='add'){btn.classList.add(className);}else{btn.classList.remove(className);}});}
function setButtonState(buttonId,options={}){const button=document.getElementById(buttonId);if(!button){return;}
if(typeof options.disabled==='boolean'){button.disabled=options.disabled;button.classList.toggle('disabled',options.disabled);}
if(options.text){button.innerHTML=options.text;}}
function resetResultActions(){setButtonState('save',{disabled:true,text:'保存'});setButtonState('share',{disabled:true,text:'分享'});}
function enableSaveAction(){setButtonState('save',{disabled:false,text:'保存'});setButtonState('share',{disabled:true,text:'分享'});setButtonState('follow',{disabled:true,text:'追问'});}
function enableFollowAction(){setButtonState('follow',{disabled:false,text:'追问'});}
function enableShareAction(text='分享'){setButtonState('share',{disabled:false,text:text});}
function markSaveCompleted(){setButtonState('save',{disabled:true,text:'已保存'});}
function setSaveLoading(){setButtonState('save',{disabled:true,text:'保存中...'});}
function setShareLoading(){setButtonState('share',{disabled:true,text:'生成中...'});}
function showSharePanel(url=''){const shareLinkElement=document.getElementById('share-case-url');if(!shareLinkElement){return;}
shareLinkElement.classList.add('active');shareLinkElement.innerText=url;}
function hideSharePanel(){const shareLinkElement=document.getElementById('share-case-url');if(!shareLinkElement){return;}
shareLinkElement.classList.remove('active');shareLinkElement.innerText='';}
function updateTips(text,isActive=true){const tips=document.getElementById('tips');const tipsText=document.getElementById('tips-text');if(tipsText)tipsText.textContent=text;if(tips){tips.classList.toggle('active',isActive);}}
function switchDebateTab(targetId){const tabs=document.querySelectorAll('.debate-tab');const contents=document.querySelectorAll('.debate-tab-content');tabs.forEach(tab=>{const isActive=tab.getAttribute('data-tab')===targetId;tab.classList.toggle('active',isActive);});contents.forEach(content=>{content.classList.toggle('active',content.id===targetId);});}
function bindAgentPanelEvents(){const tabs=document.querySelectorAll('.debate-tab');tabs.forEach(tab=>{tab.onclick=function(){switchDebateTab(tab.getAttribute('data-tab'));};});const tips=document.getElementById('tips');if(tips){tips.onclick=function(){showAgentPanel({force:true});};}
const closeBtn=document.getElementById('agent-close-btn');if(closeBtn){closeBtn.onclick=function(){dismissAgentPanel({byUser:true});};}}
function renderStructuredAgentPanel(caseData){const agentPanel=document.getElementById('agent-panel');const tips=document.getElementById('tips');if(!agentPanel||!window.liurenCasePanel){return;}
const activeContentId=agentPanel.querySelector('.debate-tab-content.active')?.id||'';agentPanel.innerHTML=initialAgentPanelHtml;if(!caseData){agentPanel.classList.remove('active');if(tips){tips.style.display='none';}
return;}
window.liurenCasePanel.render(caseData,{agentPanel,tips,tipsText:document.getElementById('tips-text'),preserveAllRounds:true,activeContentId});bindAgentPanelEvents();if(typeof debateMessageHandler!=='undefined'&&debateMessageHandler.hydrateFromDom){debateMessageHandler.hydrateFromDom();}}
function resetAgentPanel(){const agentPanel=document.getElementById('agent-panel');if(!agentPanel){return;}
agentPanel.innerHTML=initialAgentPanelHtml;agentPanel.classList.remove('active');isAgentPanelDismissedByUser=false;bindAgentPanelEvents();}
function resetAgentPanelAutoOpenState(){isAgentPanelDismissedByUser=false;}
function showAgentPanel(options={}){const{force=false}=options;const panel=document.getElementById('agent-panel');if(!panel){return;}
if(!force&&isAgentPanelDismissedByUser){return;}
panel.classList.add('active');}
function dismissAgentPanel(options={}){const{byUser=false}=options;const panel=document.getElementById('agent-panel');if(!panel){return;}
panel.classList.remove('active');if(byUser){isAgentPanelDismissedByUser=true;}}
function showAppraisePanel(){const panel=document.getElementById('appraise-panel');if(panel)panel.classList.add('active');}
return{setBtnState,resetResultActions,enableSaveAction,enableFollowAction,enableShareAction,markSaveCompleted,setSaveLoading,setShareLoading,showSharePanel,hideSharePanel,bindAgentPanelEvents,renderStructuredAgentPanel,resetAgentPanel,resetAgentPanelAutoOpenState,showAgentPanel,dismissAgentPanel,updateTips,showAppraisePanel}})();;const liurenLocalStorage=(()=>{'use strict';const storageName='liuren_jiegua_data';const STATUS={NONE:'none',PENDING:'pending',WAITING_RESOURCE:'waiting_resource',PROCESSING:'processing',COMPLETED:'completed',FAILED:'failed',CANCELLED:'cancelled'};const DEFAULT_DATA={status:STATUS.NONE,mode:'multi',agent:'pro',category:'liuren',markdownGuaxiang:'',baseGuaxiang:'',topicMap:{},resultAnalysis:'',reasoningProcess:'',taskId:'',tempCaseId:'',caseId:'',created_at:'',taskStartedAt:0,shareUrl:'',lastStreamSeq:0};function normalizeDataShape(data){const nextData={...DEFAULT_DATA,...(data||{})};if(!nextData.taskId&&nextData['task_id']){nextData.taskId=nextData['task_id'];}
delete nextData['task_id'];return nextData;}
function updateStorageData(field,value){let data=getData();if(!data){data={...DEFAULT_DATA};}
data[field]=(data[field]||'')+value;replaceStorage(data);}
function setStorageData(field,value){let data=getData();if(!data){data={...DEFAULT_DATA};}
data[field==='task_id'?'taskId':field]=value;replaceStorage(data);}
function batchUpdateStorageData(dataObj){const data={...(getData()||DEFAULT_DATA)};Object.entries(dataObj||{}).forEach(([field,value])=>{data[field==='task_id'?'taskId':field]=value;});replaceStorage(data);}
function getData(){try{const data=localStorage.getItem(storageName);return data?normalizeDataShape(JSON.parse(data)):null;}catch(e){return null;}}
function replaceStorage(data){localStorage.setItem(storageName,JSON.stringify(normalizeDataShape(data)));}
function getKeyData(key){const data=getData();return data&&data[key]!==undefined?data[key]:null;}
function clearStorage(){localStorage.removeItem(storageName);}
function resetStorage(){replaceStorage({...DEFAULT_DATA});}
function resetTaskRuntimeData(){batchUpdateStorageData({resultAnalysis:'',reasoningProcess:'',taskId:'',caseId:'',tempCaseId:'',topicMap:{},created_at:'',taskStartedAt:0,shareUrl:'',lastStreamSeq:0,status:STATUS.NONE});}
function initStorage(){const data=getData();if(!data){resetStorage();return;}
replaceStorage(data);}
return{STATUS,DEFAULT_DATA,updateStorageData,setStorageData,batchUpdateStorageData,getData,getKeyData,replaceStorage,clearStorage,resetStorage,resetTaskRuntimeData,initStorage};})();;const liurenUtils=(()=>{'use strict';const DEFAULT_TIPS_TEXT='相信科学真理，反对封建迷信，算法模拟古法，解读仅供趣谈';const MCP_HTML_PATTERN=/<div\s+class="mcp-(?:result|error)[^"]*">[\s\S]*?<\/div>|<span\s+class="mcp-(?:result|error)[^"]*">[\s\S]*?<\/span>/g;function getCookie(name){const value=`; ${document.cookie}`;const parts=value.split(`; ${name}=`);if(parts.length===2){return parts.pop().split(';').shift();}
return'';}
function escapeHtml(value){return String(value??'').replace(/[&<>'"]/g,(char)=>{const escapeMap={'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'};return escapeMap[char]||char;});}
function renderMarkdownSafe(markdownText){const mcpFragments=[];const textWithPlaceholders=(markdownText||'').replace(MCP_HTML_PATTERN,function(match){const index=mcpFragments.length;mcpFragments.push(match);return'\n%%MCP_'+index+'%%\n';});const escapedText=escapeHtml(textWithPlaceholders);let html=escapedText.replace(/\n/g,'<br>');if(typeof marked!=='undefined'&&marked.parse){try{html=marked.parse(escapedText,{breaks:true,gfm:true});}catch(error){console.warn('安全 Markdown 渲染失败，回退到纯文本模式:',error);}}
for(let i=0;i<mcpFragments.length;i+=1){html=html.replace('<p>%%MCP_'+i+'%%</p>',mcpFragments[i]);html=html.replace('%%MCP_'+i+'%%',mcpFragments[i]);}
return html;}
function sanitizeHtmlFragment(html){const template=document.createElement('template');template.innerHTML=String(html||'');const allowedTags=new Set(['div','span','p','br','strong','em','b','i','u','s','small','sub','sup','ul','ol','li','pre','code','blockquote','hr','h1','h2','h3','h4','h5','h6','table','thead','tbody','tfoot','tr','td','th','section','article','header','footer','main','label','button','svg','path','g','circle','line','polyline','polygon','rect','ellipse']);const dropTags=new Set(['script','style','iframe','object','embed','link','meta','title','form','input','textarea','select','option']);const unwrapTags=new Set(['html','body','head','template']);const allowedAttrs=new Set(['id','class','role','title','type','aria-label','aria-hidden','aria-controls','aria-expanded','viewBox','fill','stroke','stroke-width','d','cx','cy','r','x','y','x1','x2','y1','y2','points']);const urlAttrs=new Set(['href','src','xlink:href']);function isSafeUrl(value){const normalized=String(value||'').trim().toLowerCase();if(!normalized){return true;}
if(normalized.startsWith('#')||normalized.startsWith('/')){return true;}
return/^(https?:|mailto:|tel:|data:image\/)/.test(normalized);}
function sanitizeElement(element){Array.from(element.childNodes).forEach((child)=>{if(child.nodeType===Node.COMMENT_NODE){child.remove();return;}
if(child.nodeType!==Node.ELEMENT_NODE){return;}
const tagName=child.tagName.toLowerCase();if(dropTags.has(tagName)){child.remove();return;}
if(unwrapTags.has(tagName)||!allowedTags.has(tagName)){const fragment=document.createDocumentFragment();while(child.firstChild){fragment.appendChild(child.firstChild);}
child.replaceWith(fragment);sanitizeElement(element);return;}
Array.from(child.attributes).forEach((attr)=>{const attrName=attr.name;const lowerAttrName=attrName.toLowerCase();if(lowerAttrName.startsWith('on')){child.removeAttribute(attrName);return;}
if(urlAttrs.has(lowerAttrName)&&!isSafeUrl(attr.value)){child.removeAttribute(attrName);return;}
if(allowedAttrs.has(attrName)||allowedAttrs.has(lowerAttrName)){return;}
if(lowerAttrName.startsWith('data-')||lowerAttrName.startsWith('aria-')){return;}
child.removeAttribute(attrName);});sanitizeElement(child);});}
sanitizeElement(template.content);return template.innerHTML;}
async function requestJson(url,options={}){const response=await fetch(url,options);let data=null;try{data=await response.json();}catch(error){if(!response.ok){throw new Error(`请求失败：${response.status}`);}
throw new Error('服务返回了无法解析的数据');}
if(!response.ok){throw new Error(data?.message||`请求失败：${response.status}`);}
return data;}
function toBoolean(value){if(typeof value==='boolean'){return value;}
return String(value).toLowerCase()==='true';}
function normalizeIsoOrTimestamp(value){if(!value){return 0;}
if(typeof value==='number'){return Number.isFinite(value)?value:0;}
const time=Date.parse(value);return Number.isNaN(time)?0:time;}
function mergeTopicMaps(primaryTopicMap,fallbackTopicMap){const primary=isPlainObject(primaryTopicMap)?primaryTopicMap:{};const fallback=isPlainObject(fallbackTopicMap)?fallbackTopicMap:{};const merged={};const fieldNames=new Set([...Object.keys(fallback),...Object.keys(primary)]);fieldNames.forEach((fieldName)=>{const primaryTopic=isPlainObject(primary[fieldName])?primary[fieldName]:{};const fallbackTopic=isPlainObject(fallback[fieldName])?fallback[fieldName]:{};merged[fieldName]=mergeTopicPayload(primaryTopic,fallbackTopic);});return merged;}
function mergeTopicPayload(primaryTopic,fallbackTopic){if(!topicHasContent(primaryTopic)){return fallbackTopic;}
if(!topicHasContent(fallbackTopic)){return primaryTopic;}
const primaryScore=scoreTopicPayload(primaryTopic);const fallbackScore=scoreTopicPayload(fallbackTopic);const richerTopic=primaryScore>=fallbackScore?primaryTopic:fallbackTopic;const leanerTopic=richerTopic===primaryTopic?fallbackTopic:primaryTopic;const mergedEntries=mergeTopicEntries(collectTopicEntries(richerTopic),collectTopicEntries(leanerTopic));const mergedTopic={...leanerTopic,...richerTopic,};if(mergedEntries.length>0){mergedTopic.entries=mergedEntries;}
return mergedTopic;}
function collectTopicEntries(topic){if(!isPlainObject(topic)){return[];}
if(Array.isArray(topic.entries)&&topic.entries.length>0){return topic.entries.slice();}
const entries=[];appendEntries(entries,topic.pro);appendEntries(entries,topic.con);const judge=isPlainObject(topic.judge)?topic.judge:{};appendEntries(entries,judge.decisions);if(isPlainObject(judge.final)){entries.push(judge.final);}
appendEntries(entries,topic.info);const mcp=isPlainObject(topic.mcp)?topic.mcp:{};if(Array.isArray(mcp.entries)){mcp.entries.forEach((entry)=>{if(!isPlainObject(entry)){return;}
entries.push({type:'info',title:entry.title||'MCP',content_markdown:entry.content_markdown||'',reasoning_only:entry.type==='reasoning'});});}
return entries;}
function appendEntries(target,entries){if(!Array.isArray(entries)){return;}
entries.forEach((entry)=>{if(isPlainObject(entry)){target.push(entry);}});}
function mergeTopicEntries(primaryEntries,fallbackEntries){if(!Array.isArray(primaryEntries)||primaryEntries.length===0){return Array.isArray(fallbackEntries)?fallbackEntries.slice():[];}
if(!Array.isArray(fallbackEntries)||fallbackEntries.length===0){return primaryEntries.slice();}
const merged=[];const usedFallbackIndexes=new Set();primaryEntries.forEach((primaryEntry,primaryIndex)=>{const fallbackIndex=findMatchingEntryIndex(primaryEntry,fallbackEntries,usedFallbackIndexes,primaryIndex);if(fallbackIndex===-1){merged.push(primaryEntry);return;}
usedFallbackIndexes.add(fallbackIndex);merged.push(mergeEntryPayload(primaryEntry,fallbackEntries[fallbackIndex]));});fallbackEntries.forEach((fallbackEntry,fallbackIndex)=>{if(!usedFallbackIndexes.has(fallbackIndex)){merged.push(fallbackEntry);}});return merged;}
function findMatchingEntryIndex(primaryEntry,fallbackEntries,usedFallbackIndexes,preferredIndex){const preferredEntry=fallbackEntries[preferredIndex];if(!usedFallbackIndexes.has(preferredIndex)&&isSameEntryKind(primaryEntry,preferredEntry)){return preferredIndex;}
for(let index=0;index<fallbackEntries.length;index+=1){if(usedFallbackIndexes.has(index)){continue;}
if(isSameEntryKind(primaryEntry,fallbackEntries[index])){return index;}}
return-1;}
function isSameEntryKind(left,right){if(!isPlainObject(left)||!isPlainObject(right)){return false;}
const leftType=String(left.type||'').trim();const rightType=String(right.type||'').trim();if(leftType!==rightType){return false;}
if(leftType==='debate'){return String(left.role||'').trim()===String(right.role||'').trim();}
if(leftType==='info'){return String(left.title||'').trim()===String(right.title||'').trim();}
return true;}
function mergeEntryPayload(primaryEntry,fallbackEntry){const primaryScore=scoreEntryPayload(primaryEntry);const fallbackScore=scoreEntryPayload(fallbackEntry);const richerEntry=primaryScore>=fallbackScore?primaryEntry:fallbackEntry;const leanerEntry=richerEntry===primaryEntry?fallbackEntry:primaryEntry;return{...leanerEntry,...richerEntry};}
function scoreTopicPayload(topic){if(!isPlainObject(topic)){return 0;}
let score=0;collectTopicEntries(topic).forEach((entry)=>{score+=scoreEntryPayload(entry);});score+=stringScore(topic.topic_title);score+=stringScore(topic.markdown);score+=topic.completed?10:0;return score;}
function scoreEntryPayload(entry){if(!isPlainObject(entry)){return 0;}
return['content_markdown','reasoning_markdown','reason_markdown','next_instruction_markdown','final_content_markdown','title','role_label','status'].reduce((total,key)=>total+stringScore(entry[key]),0);}
function stringScore(value){return String(value||'').trim().length;}
function topicHasContent(topic){if(!isPlainObject(topic)){return false;}
if(Array.isArray(topic.entries)&&topic.entries.length>0){return true;}
return Object.values(topic).some((value)=>{if(Array.isArray(value)){return value.length>0;}
if(isPlainObject(value)){return topicHasContent(value);}
return Boolean(String(value||'').trim());});}
function isPlainObject(value){return!!value&&typeof value==='object'&&!Array.isArray(value);}
function buildGuaxiangHtml(){const name=escapeHtml(document.getElementById('name')?.value?.trim()||'');const gender=escapeHtml(document.getElementById('gender')?.value?.trim()||'');const birthday=escapeHtml(document.getElementById('birthday')?.value||'');const identity=escapeHtml(document.getElementById('identity')?.value?.trim()||'');const question=escapeHtml(document.getElementById('question')?.value?.trim()||'');const time=escapeHtml(document.getElementById('time')?.value||'');const ganzhiCard=document.getElementById('ganzhi-card');const sanchuanCard=document.getElementById('sanchuan-card');const tiandipanCard=document.getElementById('tiandipan-card');if(!ganzhiCard&&!sanchuanCard&&!tiandipanCard){return'';}
return`
            <!DOCTYPE html>
            <html lang="zh">
            <head>
                <meta charset="UTF-8">
                <title>六壬排盘</title>
            </head>
            <body style="display:flex; flex-direction: column; background-color: #222831; gap: 10px;">
                <div class="save_case_panel">
                    <div class="card save-guali-info-card">
                        <div class="guali-info"><label>占问人：</label><label>${name}</label></div>
                        <div class="guali-info"><label>性别：</label><label>${gender}</label></div>
                        <div class="guali-info"><label>生日：</label><label>${birthday}</label></div>
                        <div class="guali-info"><label>身份：</label><label>${identity}</label></div>
                        <div class="guali-info"><label>占问事项：</label><label>${question}</label></div>
                        <div class="guali-info"><label>占问时间：</label><label>${time}</label></div>
                    </div>
                    ${ganzhiCard ? ganzhiCard.outerHTML : ''}
                    ${sanchuanCard ? sanchuanCard.outerHTML : ''}
                    ${tiandipanCard ? tiandipanCard.outerHTML : ''}
                </div>
            </body>
            </html>`;}
return{DEFAULT_TIPS_TEXT,getCookie,escapeHtml,renderMarkdownSafe,sanitizeHtmlFragment,requestJson,toBoolean,normalizeIsoOrTimestamp,mergeTopicMaps,buildGuaxiangHtml};})();window.liurenUtils=liurenUtils;;const liurenCasePanel=(()=>{'use strict';const ROUND_ID_MAP={leishen_analysis:'round_1',sike_analysis:'round_2',sanchuan_analysis:'round_3',tianjiang_analysis:'round_4',nianming_analysis:'round_5',xianshi_analysis:'round_6',yingqi_analysis:'round_7'};const TOPIC_CONFIGS=[{field:'leishen_analysis',tabId:'tab-round-1',contentId:'debate-round-1',title:'用神取用'},{field:'sike_analysis',tabId:'tab-round-2',contentId:'debate-round-2',title:'四课分析'},{field:'sanchuan_analysis',tabId:'tab-round-3',contentId:'debate-round-3',title:'三传分析'},{field:'tianjiang_analysis',tabId:'tab-round-4',contentId:'debate-round-4',title:'天将神煞'},{field:'nianming_analysis',tabId:'tab-round-5',contentId:'debate-round-5',title:'年命交互'},{field:'xianshi_analysis',tabId:'tab-round-6',contentId:'debate-round-6',title:'现实对轨'},{field:'yingqi_analysis',tabId:'tab-round-7',contentId:'debate-round-7',title:'应期推断'}];const ROLE_META={pro:{label:'正方',bubbleClass:'debate-bubble-pro'},con:{label:'反方',bubbleClass:'debate-bubble-con'},judge:{label:'裁判',bubbleClass:'debate-bubble-judge'}};function render(caseData,options={}){const agentPanel=options.agentPanel;const tips=options.tips;const tipsText=options.tipsText||document.getElementById('tips-text');const preserveAllRounds=options.preserveAllRounds===true;const activeContentId=options.activeContentId||'';if(!agentPanel){return;}
const reasoningText=normalizeText(caseData?.reasoning_process||caseData?.reasoning_markdown);const visibleTopics=TOPIC_CONFIGS.map((config)=>{const topic=normalizeTopic(caseData,config);return{config,topic};}).filter(({topic})=>topicHasContent(topic));if(visibleTopics.length>0){if(preserveAllRounds){hideRound(agentPanel,'tab-round-0','debate-round-0');TOPIC_CONFIGS.forEach((config)=>{const visibleTopic=visibleTopics.find((item)=>item.config.field===config.field);if(visibleTopic){fillTopicRound(agentPanel,config,visibleTopic.topic);showRound(agentPanel,config.tabId,config.contentId);}else{resetRound(agentPanel,config.tabId,config.contentId,config.title);hideRound(agentPanel,config.tabId,config.contentId);}});}else{removeRound(agentPanel,'tab-round-0','debate-round-0');visibleTopics.forEach(({config,topic})=>fillTopicRound(agentPanel,config,topic));TOPIC_CONFIGS.forEach((config)=>{if(!visibleTopics.some((item)=>item.config.field===config.field)){removeRound(agentPanel,config.tabId,config.contentId);}});}
activateVisibleRound(agentPanel,visibleTopics.map((item)=>item.config.contentId),activeContentId);bindPanelInteractions(agentPanel,tips);showTips(tips,tipsText,'点击查看多智能体解读详情');return;}
if(reasoningText){if(preserveAllRounds){TOPIC_CONFIGS.forEach((config)=>{resetRound(agentPanel,config.tabId,config.contentId,config.title);hideRound(agentPanel,config.tabId,config.contentId);});showRound(agentPanel,'tab-round-0','debate-round-0');}else{TOPIC_CONFIGS.forEach((config)=>removeRound(agentPanel,config.tabId,config.contentId));}
fillReasoningRound(agentPanel,reasoningText);activateRound(agentPanel,'tab-round-0','debate-round-0');bindPanelInteractions(agentPanel,tips);showTips(tips,tipsText,'点击查看深度推理');return;}
removePanel(agentPanel,tips);}
function normalizeTopic(caseData,config){const topicMap=caseData?.topic_map||{};const rawTopic=topicMap[config.field]||caseData?.[config.field]||{};const entries=collectEntries(rawTopic).filter(entryHasContent);if(!entries.length){return{};}
return{title:normalizeText(rawTopic.topic_title||rawTopic.title||config.title)||config.title,completed:rawTopic.completed!==false,entries};}
function collectEntries(topic){if(!topic||typeof topic!=='object'){return[];}
if(Array.isArray(topic.entries)&&topic.entries.length>0){return topic.entries.slice();}
const entries=[];appendEntryList(entries,topic.pro);appendEntryList(entries,topic.con);const judge=topic.judge&&typeof topic.judge==='object'?topic.judge:{};appendEntryList(entries,judge.decisions);if(judge.final&&typeof judge.final==='object'){entries.push(judge.final);}
appendEntryList(entries,topic.info);const mcp=topic.mcp&&typeof topic.mcp==='object'?topic.mcp:{};appendEntryList(entries,(mcp.entries||[]).map((entry)=>({type:'info',title:entry.title||'MCP',content_markdown:entry.content_markdown||'',reasoning_only:entry.type==='reasoning'})));return entries;}
function appendEntryList(target,entries){if(!Array.isArray(entries)){return;}
entries.forEach((entry)=>{if(entry&&typeof entry==='object'){target.push(entry);}});}
function entryHasContent(entry){if(!entry||typeof entry!=='object'){return false;}
const entryType=String(entry.type||'').trim();if(entryType==='debate'){return Boolean(normalizeText(entry.content_markdown)||normalizeText(entry.reasoning_markdown));}
if(entryType==='judge_decision'){return Boolean(normalizeText(entry.reason_markdown)||normalizeText(entry.next_instruction_markdown)||normalizeText(entry.final_content_markdown));}
if(entryType==='judge_final'||entryType==='markdown'||entryType==='info'){return Boolean(normalizeText(entry.content_markdown));}
return false;}
function topicHasContent(topic){return Array.isArray(topic?.entries)&&topic.entries.some(entryHasContent);}
function fillTopicRound(agentPanel,config,topic){const tab=agentPanel.querySelector(`#${config.tabId}`);const content=agentPanel.querySelector(`#${config.contentId}`);if(!tab||!content){return;}
tab.textContent=topic.title;content.innerHTML=buildRoundHtml(topic.title,topic.entries,topic.completed);}
function fillReasoningRound(agentPanel,reasoningText){const reasoningTab=agentPanel.querySelector('#tab-round-0');const reasoningContent=agentPanel.querySelector('#debate-round-0');if(!reasoningTab||!reasoningContent){return;}
reasoningTab.textContent='深度推理';reasoningContent.innerHTML=`
            ${buildRoundHeader('深度推理', true)}
            ${buildInfoBubbleHtml('推理过程', reasoningText, 'debate-bubble-default', false)}
        `;}
function buildRoundHtml(title,entries,completed){const entriesHtml=entries.map(renderEntry).join('');return`
            ${buildRoundHeader(title, completed)}
            ${entriesHtml}
        `;}
function buildRoundHeader(title,completed){return`
            <div class="debate-round-header">
                <h3>${liurenUtils.escapeHtml(title)}</h3>
                <span class="debate-start-tag">${completed ? '已完成' : '未完成'}</span>
            </div>
        `;}
function renderEntry(entry){const entryType=String(entry?.type||'').trim();if(entryType==='debate'){return buildDebateBubbleHtml(entry);}
if(entryType==='judge_decision'){return buildJudgeDecisionHtml(entry);}
if(entryType==='judge_final'){return buildJudgeFinalHtml(entry);}
if(entryType==='info'){return buildInfoBubbleHtml(entry.title||'说明',entry.content_markdown||'','debate-bubble-default',Boolean(entry.reasoning_only));}
if(entryType==='markdown'){return buildInfoBubbleHtml('记录',entry.content_markdown||'','debate-bubble-default',false);}
return'';}
function buildDebateBubbleHtml(entry){const roleMeta=ROLE_META[entry.role]||{label:entry.role_label||'发言',bubbleClass:'debate-bubble-default'};const reasoningHtml=liurenUtils.renderMarkdownSafe(entry.reasoning_markdown||'');const contentHtml=liurenUtils.renderMarkdownSafe(entry.content_markdown||'');if(!reasoningHtml&&!contentHtml){return'';}
const reasoningBlock=reasoningHtml?`
            <div class="reasoning-collapsible collapsed">
                <div class="reasoning-header">
                    <span class="reasoning-toggle-icon">
                        <svg viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"></path></svg>
                    </span>
                    <span>思考过程</span>
                </div>
                <div class="reasoning-content-wrapper">
                    <div class="reasoning-content">${reasoningHtml}</div>
                </div>
            </div>
        `:'';return`
            <div class="debate-bubble ${roleMeta.bubbleClass}">
                <div class="debate-bubble-header">
                    <span class="debate-role-tag">${liurenUtils.escapeHtml(entry.role_label || roleMeta.label)}</span>
                </div>
                ${reasoningBlock}
                <div class="debate-bubble-content">${contentHtml}</div>
            </div>
        `;}
function buildJudgeDecisionHtml(entry){const isDebating=String(entry.status||'').trim()==='debating';const statusText=isDebating?'需要继续讨论':'裁决完成';const statusClass=isDebating?'judge-status judge-status-continue':'judge-status judge-status-consensus';const reasonHtml=liurenUtils.renderMarkdownSafe(entry.reason_markdown||'');const nextInstructionHtml=liurenUtils.renderMarkdownSafe(entry.next_instruction_markdown||'');const finalContentHtml=liurenUtils.renderMarkdownSafe(entry.final_content_markdown||'');if(!reasonHtml&&!nextInstructionHtml&&!finalContentHtml){return'';}
return`
            <div class="debate-bubble debate-bubble-judge">
                <div class="debate-bubble-header">
                    <span class="debate-role-tag">裁判</span>
                    <span class="${statusClass}">${statusText}</span>
                </div>
                <div class="debate-bubble-content">
                    ${reasonHtml ? `<div class="judge-reason">${reasonHtml}</div>` : ''}
                    ${nextInstructionHtml ? `<div class="judge-next-instruction"><strong>后续指引：</strong><div>${nextInstructionHtml}</div></div>` : ''}
                    ${finalContentHtml ? `<div class="judge-reason"><strong>暂定结论：</strong><div>${finalContentHtml}</div></div>` : ''}
                </div>
            </div>
        `;}
function buildJudgeFinalHtml(entry){const contentHtml=liurenUtils.renderMarkdownSafe(entry.content_markdown||'');if(!contentHtml){return'';}
return`
            <div class="debate-bubble debate-bubble-judge-final">
                <div class="debate-bubble-header">
                    <span class="debate-role-tag">裁判结论</span>
                    <span class="judge-status judge-status-final">已完成</span>
                </div>
                <div class="debate-bubble-content final-content">${contentHtml}</div>
            </div>
        `;}
function buildInfoBubbleHtml(title,markdown,bubbleClass,reasoningOnly){const contentHtml=liurenUtils.renderMarkdownSafe(markdown||'');if(!contentHtml){return'';}
if(reasoningOnly){return`
                <div class="debate-bubble ${bubbleClass}">
                    <div class="reasoning-collapsible collapsed">
                        <div class="reasoning-header">
                            <span class="reasoning-toggle-icon">
                                <svg viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"></path></svg>
                            </span>
                            <span>${liurenUtils.escapeHtml(title)}</span>
                        </div>
                        <div class="reasoning-content-wrapper">
                            <div class="reasoning-content">${contentHtml}</div>
                        </div>
                    </div>
                </div>
            `;}
return`
            <div class="debate-bubble ${bubbleClass}">
                <div class="debate-bubble-header">
                    <span class="debate-role-tag">${liurenUtils.escapeHtml(title)}</span>
                </div>
                <div class="debate-bubble-content">${contentHtml}</div>
            </div>
        `;}
function bindPanelInteractions(agentPanel,tips){if(tips&&!tips.dataset.agentPanelBound){tips.addEventListener('click',()=>{if(!agentPanel.isConnected){return;}
if(window.liurenUI&&typeof liurenUI.showAgentPanel==='function'){liurenUI.showAgentPanel({force:true});return;}
agentPanel.classList.add('active');});tips.dataset.agentPanelBound='true';}
const closeBtn=agentPanel.querySelector('#agent-close-btn');if(closeBtn&&!closeBtn.dataset.panelBound){closeBtn.addEventListener('click',()=>{if(window.liurenUI&&typeof liurenUI.dismissAgentPanel==='function'){liurenUI.dismissAgentPanel({byUser:true});return;}
agentPanel.classList.remove('active');});closeBtn.dataset.panelBound='true';}
agentPanel.querySelectorAll('.debate-tab').forEach((tab)=>{if(tab.dataset.panelBound){return;}
tab.addEventListener('click',()=>{activateRound(agentPanel,tab.id,tab.getAttribute('data-tab'));});tab.dataset.panelBound='true';});agentPanel.querySelectorAll('.reasoning-header').forEach((header)=>{if(header.dataset.panelBound){return;}
header.addEventListener('click',()=>{const collapsible=header.closest('.reasoning-collapsible');if(collapsible){collapsible.classList.toggle('collapsed');}});header.dataset.panelBound='true';});}
function activateVisibleRound(agentPanel,visibleContentIds,preferredContentId){const nextContentId=visibleContentIds.includes(preferredContentId)?preferredContentId:visibleContentIds[0];if(!nextContentId){return;}
const tab=agentPanel.querySelector(`.debate-tab[data-tab="${nextContentId}"]`);if(!tab){return;}
activateRound(agentPanel,tab.id,nextContentId);}
function activateRound(agentPanel,tabId,contentId){agentPanel.querySelectorAll('.debate-tab').forEach((tab)=>tab.classList.remove('active'));agentPanel.querySelectorAll('.debate-tab-content').forEach((content)=>content.classList.remove('active'));const tab=agentPanel.querySelector(`#${tabId}`);const content=agentPanel.querySelector(`#${contentId}`);if(tab){tab.classList.add('active');}
if(content){content.classList.add('active');}}
function removeRound(agentPanel,tabId,contentId){const tab=agentPanel.querySelector(`#${tabId}`);const content=agentPanel.querySelector(`#${contentId}`);if(tab){tab.remove();}
if(content){content.remove();}}
function resetRound(agentPanel,tabId,contentId,title){const tab=agentPanel.querySelector(`#${tabId}`);const content=agentPanel.querySelector(`#${contentId}`);if(tab){tab.textContent=title;tab.classList.remove('active','completed');}
if(content){content.innerHTML='';content.classList.remove('active');}}
function showRound(agentPanel,tabId,contentId){setRoundVisibility(agentPanel,tabId,contentId,true);}
function hideRound(agentPanel,tabId,contentId){setRoundVisibility(agentPanel,tabId,contentId,false);}
function setRoundVisibility(agentPanel,tabId,contentId,visible){const tab=agentPanel.querySelector(`#${tabId}`);const content=agentPanel.querySelector(`#${contentId}`);const displayValue=visible?'':'none';if(tab){tab.style.display=displayValue;}
if(content){content.style.display=displayValue;}}
function showTips(tips,tipsText,text){const tipsWrapper=tips?.closest('.top-tips');if(tipsWrapper){tipsWrapper.style.display='';}
if(tips){tips.style.display='block';}
if(tipsText){tipsText.textContent=text;}}
function removePanel(agentPanel,tips){const tipsWrapper=tips?.closest('.top-tips');if(tipsWrapper){tipsWrapper.remove();}else if(tips){tips.style.display='none';}
agentPanel.remove();}
function normalizeText(value){return String(value||'').trim();}
function captureTopicMap(agentPanel){if(!agentPanel){return{};}
const topicMap={};TOPIC_CONFIGS.forEach((config)=>{const content=agentPanel.querySelector(`#${config.contentId}`);const tab=agentPanel.querySelector(`#${config.tabId}`);topicMap[config.field]=captureTopicRound(content,tab,config);});return topicMap;}
function captureTopicRound(content,tab,config){if(!content){return{};}
const entries=[];content.querySelectorAll('.debate-bubble').forEach((bubble)=>{const entry=captureBubbleEntry(bubble);if(entryHasContent(entry)){entries.push(entry);}});if(!entries.length){return{};}
return{topic_title:normalizeText(tab?.textContent)||config.title,round_id:ROUND_ID_MAP[config.field]||'round_1',completed:Boolean(tab?.classList.contains('completed'))||Boolean(entries.length),entries};}
function captureBubbleEntry(bubble){if(!bubble){return null;}
if(bubble.classList.contains('debate-bubble-judge-final')){return{type:'judge_final',content_markdown:normalizeCapturedText(bubble.querySelector('.final-content')?.textContent||bubble.querySelector('.debate-bubble-content')?.textContent)};}
if(bubble.classList.contains('debate-bubble-judge')){const reasonBlocks=Array.from(bubble.querySelectorAll('.judge-reason'));const instructionText=normalizeCapturedText(bubble.querySelector('.judge-next-instruction')?.textContent).replace(/^后续指引[:：]?\s*/,'');const provisionalText=reasonBlocks.length>1?normalizeCapturedText(reasonBlocks[1].textContent).replace(/^暂定结论[:：]?\s*/,''):'';return{type:'judge_decision',status:/继续讨论/.test(bubble.querySelector('.judge-status')?.textContent||'')?'debating':'resolved',reason_markdown:normalizeCapturedText(reasonBlocks[0]?.textContent),next_instruction_markdown:instructionText,final_content_markdown:provisionalText};}
const roleTag=normalizeText(bubble.querySelector('.debate-role-tag')?.textContent);if(bubble.classList.contains('debate-bubble-pro')||bubble.classList.contains('debate-bubble-con')){return{type:'debate',role:bubble.classList.contains('debate-bubble-pro')?'pro':'con',role_label:roleTag||(bubble.classList.contains('debate-bubble-pro')?'正方':'反方'),reasoning_markdown:normalizeCapturedText(bubble.querySelector('.reasoning-content')?.textContent),content_markdown:normalizeCapturedText(bubble.querySelector('.debate-bubble-content')?.textContent)};}
const reasoningContent=bubble.querySelector('.reasoning-content');if(reasoningContent){return{type:'info',title:normalizeText(Array.from(bubble.querySelectorAll('.reasoning-header span')).map((node)=>normalizeText(node.textContent)).filter(Boolean).pop())||'说明',content_markdown:normalizeCapturedText(reasoningContent.textContent),reasoning_only:true};}
return{type:'info',title:roleTag||'说明',content_markdown:normalizeCapturedText(bubble.querySelector('.debate-bubble-content')?.textContent)};}
function normalizeCapturedText(value){return String(value||'').replace(/\u00a0/g,' ').replace(/\r\n/g,'\n').replace(/\n{3,}/g,'\n\n').trim();}
return{render,captureTopicMap};})();window.liurenCasePanel=liurenCasePanel;;const liurenShensha=(()=>{'use strict';class Shensha{constructor(time){const date=this._parseDateTime(time);const solar=Solar.fromYmdHms(date.year,date.month,date.day,date.hour,0,0);this.lunar=solar.getLunar();this.ganzhi=this.lunar.getBaZi();this.dayXunshou=this.lunar.getDayXunExact();this.yue=this.lunar.getMonthInChinese();this.yearGz=this.ganzhi[0];this.monthGz=this.ganzhi[1];this.dayGz=this.ganzhi[2];this.hourGz=this.ganzhi[3];this.xkong=this.lunar.getDayXunKong();}
_parseDateTime(timeStr){const normalizedTimeStr=this._normalizeDateTimeString(timeStr);const parts=normalizedTimeStr.match(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/);if(!parts){throw new Error('Invalid time format');}
return{year:parseInt(parts[1]),month:parseInt(parts[2]),day:parseInt(parts[3]),hour:parseInt(parts[4]),minute:parseInt(parts[5]),second:parseInt(parts[6])};}
_normalizeDateTimeString(timeStr){if(typeof timeStr!=='string'){return'';}
const trimmed=timeStr.trim();if(!trimmed){return'';}
const normalized=trimmed.replace('T',' ');const parts=normalized.match(/^(\d{4}-\d{2}-\d{2}) (\d{2}):(\d{2})(?::(\d{2}))?$/);if(!parts){return normalized;}
return`${parts[1]} ${parts[2]}:${parts[3]}:${parts[4] || '00'}`;}
getNiansha(){const niansha={};Object.assign(niansha,this.getTaisui());Object.assign(niansha,this.getSuihe());Object.assign(niansha,this.getSuipo());Object.assign(niansha,this.getSuimu());Object.assign(niansha,this.getSuixing());Object.assign(niansha,this.getYearJiesha());Object.assign(niansha,this.getYearZaisha());Object.assign(niansha,this.getSuisha());Object.assign(niansha,this.getGuanfu());Object.assign(niansha,this.getJiangjun());Object.assign(niansha,this.getDahao());Object.assign(niansha,this.getXiaohao());Object.assign(niansha,this.getBingfu());Object.assign(niansha,this.getSangmen());Object.assign(niansha,this.getDiaoke());Object.assign(niansha,this.getBingfu());return niansha;}
getTaisui(){const taisui=this.yearGz[1];return{'太岁':taisui};}
getSuihe(){const yearZhi=this.yearGz[1];const suiheMap={'子':'丑','丑':'子','寅':'卯','卯':'寅','辰':'巳','巳':'辰','午':'未','未':'午','申':'酉','酉':'申','戌':'亥','亥':'戌'};return{'岁合':suiheMap[yearZhi]};}
getSuipo(){const chongDict={'子':'午','午':'子','丑':'未','未':'丑','寅':'申','申':'寅','卯':'酉','酉':'卯','辰':'戌','戌':'辰','巳':'亥','亥':'巳'};const taisui=this.yearGz[1];const suipo=chongDict[taisui];return{'岁破':suipo};}
getSuimu(){const yearZhi=this.yearGz[1];const suimuMap={'子':'未','丑':'申','寅':'酉','卯':'戌','辰':'亥','巳':'子','午':'丑','未':'寅','申':'卯','酉':'辰','戌':'巳','亥':'午'};const suimu=suimuMap[yearZhi];return{'岁暮':suimu};}
getSuixing(){const yearZhi=this.yearGz[1];const suixingMap={'子':'卯','丑':'戌','寅':'巳','卯':'子','辰':'辰','巳':'申','午':'午','未':'丑','申':'寅','酉':'酉','戌':'未','亥':'亥'};return{'岁刑':suixingMap[yearZhi]};}
getYearJiesha(){const yearZhi=this.yearGz[1];const jieshaMap={'子':'巳','丑':'寅','寅':'亥','卯':'申','辰':'巳','巳':'寅','午':'亥','未':'申','申':'巳','酉':'寅','戌':'亥','亥':'申'};return{'劫煞':jieshaMap[yearZhi]};}
getYearZaisha(){const yearZhi=this.yearGz[1];const zaishaMap={'子':'午','丑':'卯','寅':'子','卯':'酉','辰':'午','巳':'卯','午':'子','未':'酉','申':'午','酉':'卯','戌':'子','亥':'酉'};return{'灾煞':zaishaMap[yearZhi]};}
getSuisha(){const yearZhi=this.yearGz[1];const suishaMap={'子':'未','丑':'辰','寅':'丑','卯':'戌','辰':'未','巳':'辰','午':'丑','未':'戌','申':'未','酉':'辰','戌':'丑','亥':'戌'};return{'岁煞':suishaMap[yearZhi]};}
getGuanfu(){const yearZhi=this.yearGz[1];const guanfuMap={'子':'辰','丑':'巳','寅':'午','卯':'未','辰':'申','巳':'酉','午':'戌','未':'亥','申':'子','酉':'丑','戌':'寅','亥':'卯'};const guanfu=guanfuMap[yearZhi];return{'官符':guanfu};}
getJiangjun(){const yearZhi=this.yearGz[1];const jiangjunMap={'子':'酉','丑':'酉','寅':'子','卯':'子','辰':'子','巳':'卯','午':'卯','未':'卯','申':'午','酉':'午','戌':'午','亥':'酉'};return{'将军':jiangjunMap[yearZhi]};}
getDahao(){const yearZhi=this.yearGz[1];const dahaoMap={'子':'午','丑':'未','寅':'申','卯':'酉','辰':'戌','巳':'亥','午':'子','未':'丑','申':'寅','酉':'卯','戌':'辰','亥':'巳'};const dahao=dahaoMap[yearZhi];return{'大耗':dahao};}
getXiaohao(){const yearZhi=this.yearGz[1];const xiaohaoMap={'子':'巳','丑':'午','寅':'未','卯':'申','辰':'酉','巳':'戌','午':'亥','未':'子','申':'丑','酉':'寅','戌':'卯','亥':'辰'};const xiaohao=xiaohaoMap[yearZhi];return{'小耗':xiaohao};}
getBingfu(){const yearZhi=this.yearGz[1];const bingfuMap={'子':'亥','丑':'子','寅':'丑','卯':'寅','辰':'卯','巳':'辰','午':'巳','未':'午','申':'未','酉':'申','戌':'酉','亥':'戌'};return{'病符':bingfuMap[yearZhi]};}
getSangmen(){const yearZhi=this.yearGz[1];const sangmenMap={'子':'寅','丑':'卯','寅':'辰','卯':'巳','辰':'午','巳':'未','午':'申','未':'酉','申':'戌','酉':'亥','戌':'子','亥':'丑'};const sangmen=sangmenMap[yearZhi];return{'丧门':sangmen};}
getDiaoke(){const taisui=this.yearGz[1];const diaokeMap={'子':'戌','丑':'亥','寅':'子','卯':'丑','辰':'寅','巳':'卯','午':'辰','未':'巳','申':'午','酉':'未','戌':'申','亥':'酉'};const diaoke=diaokeMap[taisui];return{'吊客':diaoke};}
getYuesha(){const yuesha={};Object.assign(yuesha,this.getTiande());Object.assign(yuesha,this.getYuede());Object.assign(yuesha,this.getShengqi());Object.assign(yuesha,this.getChengshen());Object.assign(yuesha,this.getHuishen());Object.assign(yuesha,this.getTiancai());Object.assign(yuesha,this.getXinshen());Object.assign(yuesha,this.getTianzhao());Object.assign(yuesha,this.getHuangen());Object.assign(yuesha,this.getHuagai());Object.assign(yuesha,this.getChangsheng());Object.assign(yuesha,this.getXuansuo());Object.assign(yuesha,this.getTianshu());Object.assign(yuesha,this.getTianji());Object.assign(yuesha,this.getTianxin());Object.assign(yuesha,this.getTianwu());Object.assign(yuesha,this.getTianma());Object.assign(yuesha,this.getTianyi());Object.assign(yuesha,this.getDiyi());Object.assign(yuesha,this.getTianjieshen());Object.assign(yuesha,this.getDijieshen());Object.assign(yuesha,this.getHuotianshe());Object.assign(yuesha,this.getYueGuanfu());Object.assign(yuesha,this.getYuepo());Object.assign(yuesha,this.getYuexing());Object.assign(yuesha,this.getDasha());Object.assign(yuesha,this.getMihuo());Object.assign(yuesha,this.getSangche());Object.assign(yuesha,this.getKugu());Object.assign(yuesha,this.getSiqi());Object.assign(yuesha,this.getSishen());Object.assign(yuesha,this.getXuezhi());Object.assign(yuesha,this.getXueji());Object.assign(yuesha,this.getCihusha());Object.assign(yuesha,this.getChansha());Object.assign(yuesha,this.getXianchi());Object.assign(yuesha,this.getJianmen());Object.assign(yuesha,this.getHuozhu());Object.assign(yuesha,this.getYueyan());Object.assign(yuesha,this.getFeilian());Object.assign(yuesha,this.getTiangui());Object.assign(yuesha,this.getTianguai());Object.assign(yuesha,this.getFeihun());Object.assign(yuesha,this.getLeigong());Object.assign(yuesha,this.getLeisha());Object.assign(yuesha,this.getFengbo());Object.assign(yuesha,this.getFengsha());Object.assign(yuesha,this.getYushi());return yuesha;}
getTiande(){const tiandeMap={'正':'丁','二':'坤','三':'壬','四':'辛','五':'乾','六':'甲','七':'癸','八':'艮','九':'丙','十':'乙','冬':'巽','腊':'庚'};const tiande=tiandeMap[this.yue];return{'天德':tiande};}
getYuede(){const yuedeMap={'正':'丙','二':'甲','三':'壬','四':'庚','五':'丙','六':'甲','七':'壬','八':'庚','九':'丙','十':'甲','冬':'壬','腊':'庚'};const yuede=yuedeMap[this.yue];return{'月德':yuede};}
getShengqi(){const shengqiMap={'正':'子','二':'丑','三':'寅','四':'卯','五':'辰','六':'巳','七':'午','八':'未','九':'申','十':'酉','冬':'戌','腊':'亥'};const shengqi=shengqiMap[this.yue];return{'生气':shengqi};}
getChengshen(){const chengshenMap={'正':'巳','二':'申','三':'亥','四':'寅','五':'巳','六':'申','七':'亥','八':'寅','九':'巳','十':'申','冬':'亥','腊':'寅'};const chengshen=chengshenMap[this.yue];return{'成神':chengshen};}
getHuishen(){const huishenMap={'正':'未','二':'戌','三':'寅','四':'亥','五':'酉','六':'子','七':'丑','八':'午','九':'巳','十':'卯','冬':'申','腊':'辰'};return{'会神':huishenMap[this.yue]};}
getTiancai(){const tiancaiMap={'正':'辰','二':'午','三':'申','四':'戌','五':'子','六':'寅','七':'辰','八':'午','九':'申','十':'戌','冬':'子','腊':'寅'};const tiancai=tiancaiMap[this.yue];return{'天财':tiancai};}
getXinshen(){const xinshenMap={'正':'申','二':'戌','三':'寅','四':'丑','五':'亥','六':'辰','七':'巳','八':'未','九':'巳','十':'未','冬':'申','腊':'戌'};return{'信神':xinshenMap[this.yue]};}
getTianzhao(){const tianzhaoMap={'正':'亥','二':'子','三':'丑','四':'寅','五':'卯','六':'辰','七':'巳','八':'午','九':'未','十':'申','冬':'酉','腊':'戌'};return{'天诏':tianzhaoMap[this.yue]};}
getHuangen(){const huangenMap={'正':'未','二':'酉','三':'亥','四':'丑','五':'卯','六':'巳','七':'未','八':'酉','九':'亥','十':'丑','冬':'卯','腊':'巳'};const huangen=huangenMap[this.yue];return{'皇恩':huangen};}
getHuagai(){const huagaiMap={'正':'戌','二':'未','三':'辰','四':'丑','五':'戌','六':'未','七':'辰','八':'丑','九':'戌','十':'未','冬':'辰','腊':'丑'};return{'华盖':huagaiMap[this.yue]};}
getChangsheng(){const changshengMap={'正':'酉','二':'午','三':'卯','四':'子','五':'酉','六':'午','七':'卯','八':'子','九':'酉','十':'午','冬':'卯','腊':'子'};return{'长绳':changshengMap[this.yue]};}
getXuansuo(){const xuansuoMap={'正':'卯','二':'子','三':'酉','四':'午','五':'卯','六':'子','七':'酉','八':'午','九':'卯','十':'子','冬':'酉','腊':'午'};return{'悬索':xuansuoMap[this.yue]};}
getTianshu(){const tianshuMap={'正':'子','二':'亥','三':'戌','四':'酉','五':'申','六':'未','七':'午','八':'巳','九':'辰','十':'卯','冬':'寅','腊':'丑'};return{'天鼠':tianshuMap[this.yue]};}
getTianji(){const tianjiMap={'正':'酉','二':'申','三':'未','四':'午','五':'巳','六':'辰','七':'卯','八':'寅','九':'丑','十':'子','冬':'亥','腊':'戌'};return{'天鸡':tianjiMap[this.yue]};}
getTianxin(){const tianxinMap={'正':'酉','二':'戌','三':'亥','四':'子','五':'丑','六':'寅','七':'卯','八':'辰','九':'巳','十':'午','冬':'未','腊':'申'};return{'天信':tianxinMap[this.yue]};}
getTianwu(){const tianwuMap={'正':'辰','二':'巳','三':'午','四':'未','五':'申','六':'酉','七':'戌','八':'亥','九':'子','十':'丑','冬':'寅','腊':'卯'};return{'天巫':tianwuMap[this.yue]};}
getTianma(){const tianmaMap={'正':'午','二':'申','三':'戌','四':'子','五':'寅','六':'辰','七':'午','八':'申','九':'戌','十':'子','冬':'寅','腊':'辰'};const tianma=tianmaMap[this.yue];return{'天马':tianma};}
getTianyi(){const tianyiMap={'正':'辰','二':'巳','三':'午','四':'未','五':'申','六':'酉','七':'戌','八':'亥','九':'子','十':'丑','冬':'寅','腊':'卯'};const tianyi=tianyiMap[this.yue];return{'天医':tianyi};}
getDiyi(){const diyiMap={'正':'戌','二':'亥','三':'子','四':'丑','五':'寅','六':'卯','七':'辰','八':'巳','九':'午','十':'未','冬':'申','腊':'酉'};const diyi=diyiMap[this.yue];return{'地医':diyi};}
getTianjieshen(){const tianjieshenMap={'正':'申','二':'未','三':'午','四':'巳','五':'辰','六':'卯','七':'寅','八':'丑','九':'子','十':'亥','冬':'戌','腊':'酉'};const tianjieshen=tianjieshenMap[this.yue];return{'天解神':tianjieshen};}
getDijieshen(){const dijieshenMap={'正':'申','二':'申','三':'酉','四':'酉','五':'戌','六':'戌','七':'亥','八':'亥','九':'午','十':'午','冬':'未','腊':'未'};const dijieshen=dijieshenMap[this.yue];return{'地解神':dijieshen};}
getHuotianshe(){const huotiansheMap={'正':'未','二':'戌','三':'丑','四':'辰','五':'未','六':'戌','七':'丑','八':'辰','九':'未','十':'戌','冬':'丑','腊':'辰'};const huotianshe=huotiansheMap[this.yue];return{'活天赦':huotianshe};}
getYueGuanfu(){const yueGuanfuMap={'正':'午','二':'未','三':'申','四':'酉','五':'戌','六':'亥','七':'子','八':'丑','九':'寅','十':'卯','冬':'辰','腊':'巳'};const yueGuanfu=yueGuanfuMap[this.yue];return{'月官符':yueGuanfu};}
getYuepo(){const yuepoMap={'正':'申','二':'酉','三':'戌','四':'亥','五':'子','六':'丑','七':'寅','八':'卯','九':'辰','十':'巳','冬':'午','腊':'未'};const yuepo=yuepoMap[this.yue];return{'月破':yuepo};}
getYuexing(){const yuexingMap={'正':'巳','二':'子','三':'辰','四':'申','五':'午','六':'丑','七':'寅','八':'酉','九':'未','十':'亥','冬':'卯','腊':'戌'};const yuexing=yuexingMap[this.yue];return{'月刑':yuexing};}
getDasha(){const dashaMap={'正':'丑','二':'戌','三':'未','四':'辰','五':'丑','六':'戌','七':'未','八':'辰','九':'丑','十':'戌','冬':'未','腊':'辰'};return{'大煞':dashaMap[this.yue]};}
getMihuo(){const mihuoMap={'正':'丑','二':'戌','三':'未','四':'辰','五':'丑','六':'戌','七':'未','八':'辰','九':'丑','十':'戌','冬':'未','腊':'辰'};return{'迷惑':mihuoMap[this.yue]};}
getSangche(){const sangcheMap={'正':'未','二':'辰','三':'丑','四':'戌','五':'未','六':'辰','七':'丑','八':'戌','九':'未','十':'辰','冬':'丑','腊':'戌'};const sangche=sangcheMap[this.yue];return{'丧车':sangche};}
getKugu(){const kuguMap={'正':'未','二':'申','三':'酉','四':'戌','五':'亥','六':'子','七':'丑','八':'寅','九':'卯','十':'辰','冬':'巳','腊':'午'};const kugu=kuguMap[this.yue];return{'枯骨':kugu};}
getSiqi(){const siqiMap={'正':'午','二':'未','三':'申','四':'酉','五':'戌','六':'亥','七':'子','八':'丑','九':'寅','十':'卯','冬':'辰','腊':'巳'};const siqi=siqiMap[this.yue];return{'死气':siqi};}
getSishen(){const sishenMap={'正':'巳','二':'午','三':'未','四':'申','五':'酉','六':'戌','七':'亥','八':'子','九':'丑','十':'寅','冬':'卯','腊':'辰'};const sishen=sishenMap[this.yue];return{'死神':sishen};}
getXuezhi(){const xuezhiMap={'正':'丑','二':'寅','三':'卯','四':'辰','五':'巳','六':'午','七':'未','八':'申','九':'酉','十':'戌','冬':'亥','腊':'子'};const xuezhi=xuezhiMap[this.yue];return{'血支':xuezhi};}
getXueji(){const xuejiMap={'正':'丑','二':'未','三':'寅','四':'申','五':'卯','六':'酉','七':'辰','八':'戌','九':'巳','十':'亥','冬':'午','腊':'子'};const xueji=xuejiMap[this.yue];return{'血忌':xueji};}
getCihusha(){const cihushaMap={'正':'辰','二':'巳','三':'午','四':'未','五':'申','六':'酉','七':'戌','八':'亥','九':'子','十':'丑','冬':'寅','腊':'卯'};const cihusha=cihushaMap[this.yue];return{'雌虎煞':cihusha};}
getChansha(){const chanshaMap={'正':'寅','二':'巳','三':'申','四':'亥','五':'寅','六':'巳','七':'申','八':'亥','九':'寅','十':'巳','冬':'申','腊':'亥'};const chansha=chanshaMap[this.yue];return{'产煞':chansha};}
getXianchi(){const xianchiMap={'正':'卯','二':'子','三':'酉','四':'午','五':'卯','六':'子','七':'酉','八':'午','九':'卯','十':'子','冬':'酉','腊':'午'};const xianchi=xianchiMap[this.yue];return{'咸池':xianchi};}
getJianmen(){const jianmenMap={'正':'申','二':'亥','三':'寅','四':'巳','五':'申','六':'亥','七':'寅','八':'巳','九':'申','十':'亥','冬':'寅','腊':'巳'};const jianmen=jianmenMap[this.yue];return{'奸门':jianmen};}
getHuozhu(){const huozhuMap={'正':'巳','二':'午','三':'未','四':'申','五':'酉','六':'戌','七':'亥','八':'子','九':'丑','十':'寅','冬':'卯','腊':'辰'};const huozhu=huozhuMap[this.yue];return{'火烛':huozhu};}
getYueyan(){const yueyanMap={'正':'戌','二':'酉','三':'申','四':'未','五':'午','六':'巳','七':'辰','八':'卯','九':'寅','十':'丑','冬':'子','腊':'亥'};const yueyan=yueyanMap[this.yue];return{'月厌':yueyan};}
getFeilian(){const feilianMap={'正':'戌','二':'巳','三':'午','四':'未','五':'寅','六':'卯','七':'辰','八':'亥','九':'子','十':'丑','冬':'申','腊':'酉'};const feilian=feilianMap[this.yue];return{'飞廉':feilian};}
getTiangui(){const tianguiMap={'正':'酉','二':'午','三':'卯','四':'子','五':'酉','六':'午','七':'卯','八':'子','九':'酉','十':'午','冬':'卯','腊':'子'};const tiangui=tianguiMap[this.yue];return{'天鬼':tiangui};}
getTianguai(){const tianguaiMap={'正':'丑','二':'子','三':'亥','四':'戌','五':'酉','六':'申','七':'未','八':'午','九':'巳','十':'辰','冬':'卯','腊':'寅'};const tianguai=tianguaiMap[this.yue];return{'天怪':tianguai};}
getFeihun(){const feihunMap={'正':'亥','二':'子','三':'丑','四':'寅','五':'卯','六':'辰','七':'巳','八':'午','九':'未','十':'申','冬':'酉','腊':'戌'};const feihun=feihunMap[this.yue];return{'飞魂':feihun};}
getLeigong(){const leigongMap={'正':'寅','二':'亥','三':'申','四':'巳','五':'寅','六':'亥','七':'申','八':'巳','九':'寅','十':'亥','冬':'申','腊':'巳'};const leigong=leigongMap[this.yue];return{'雷公':leigong};}
getLeisha(){const leishaMap={'正':'亥','二':'申','三':'巳','四':'寅','五':'亥','六':'申','七':'巳','八':'寅','九':'亥','十':'申','冬':'巳','腊':'寅'};const leisha=leishaMap[this.yue];return{'雷煞':leisha};}
getFengbo(){const fengboMap={'正':'申','二':'未','三':'午','四':'巳','五':'辰','六':'卯','七':'寅','八':'丑','九':'子','十':'亥','冬':'戌','腊':'酉'};const fengbo=fengboMap[this.yue];return{'风伯':fengbo};}
getFengsha(){const fengshaMap={'正':'寅','二':'丑','三':'子','四':'亥','五':'戌','六':'酉','七':'申','八':'未','九':'午','十':'巳','冬':'辰','腊':'卯'};const fengsha=fengshaMap[this.yue];return{'风煞':fengsha};}
getYushi(){const yushiMap={'正':'子','二':'卯','三':'午','四':'酉','五':'子','六':'卯','七':'午','八':'酉','九':'子','十':'卯','冬':'午','腊':'酉'};const yushi=yushiMap[this.yue];return{'雨师':yushi};}
getRisha(){const risha={};Object.assign(risha,this.getZhiyi());Object.assign(risha,this.getZhide());Object.assign(risha,this.getLiuhe());Object.assign(risha,this.getSanhe());Object.assign(risha,this.getLiuchong());Object.assign(risha,this.getLiupo());Object.assign(risha,this.getLiuhai());Object.assign(risha,this.getSanxing());Object.assign(risha,this.getRima());Object.assign(risha,this.getDayHuagai());Object.assign(risha,this.getPosui());Object.assign(risha,this.getTaohua());Object.assign(risha,this.getLeidian());Object.assign(risha,this.getDayYushi());Object.assign(risha,this.getQinglang());Object.assign(risha,this.getDayJiangjun());return risha;}
getZhiyi(){const dayZhi=this.dayGz[1];const zhiyiMap={'子':'午','丑':'巳','寅':'辰','卯':'卯','辰':'寅','巳':'丑','午':'未','未':'申','申':'酉','酉':'戌','戌':'亥','亥':'子'};const zhiyi=zhiyiMap[dayZhi];return{'支仪':zhiyi};}
getZhide(){const dayZhi=this.dayGz[1];const zhideMap={'子':'巳','丑':'午','寅':'未','卯':'申','辰':'酉','巳':'戌','午':'亥','未':'子','申':'丑','酉':'寅','戌':'卯','亥':'辰'};const zhide=zhideMap[dayZhi];return{'支德':zhide};}
getLiuhe(){const dayZhi=this.dayGz[1];const liuheMap={'子':'丑','丑':'子','寅':'亥','卯':'戌','辰':'酉','巳':'申','午':'未','未':'午','申':'巳','酉':'辰','戌':'卯','亥':'寅'};const liuhe=liuheMap[dayZhi];return{'六合':liuhe};}
getSanhe(){const dayZhi=this.dayGz[1];const sanheMap={'子':'申辰','丑':'巳酉','寅':'午戌','卯':'亥未','辰':'申子','巳':'酉丑','午':'寅戌','未':'亥卯','申':'子辰','酉':'巳丑','戌':'午寅','亥':'卯未'};const sanhe=sanheMap[dayZhi];return{'三合':sanhe};}
getLiuchong(){const dayZhi=this.dayGz[1];const liuchongMap={'子':'午','丑':'未','寅':'申','卯':'酉','辰':'戌','巳':'亥','午':'子','未':'丑','申':'寅','酉':'卯','戌':'辰','亥':'巳'};const liuchong=liuchongMap[dayZhi];return{'六冲':liuchong};}
getLiupo(){const dayZhi=this.dayGz[1];const liupoMap={'子':'酉','丑':'辰','寅':'亥','卯':'午','辰':'丑','巳':'申','午':'卯','未':'戌','申':'巳','酉':'子','戌':'未','亥':'寅'};const liupo=liupoMap[dayZhi];return{'六破':liupo};}
getLiuhai(){const dayZhi=this.dayGz[1];const liuhaiMap={'子':'未','丑':'午','寅':'巳','卯':'辰','辰':'卯','巳':'寅','午':'丑','未':'子','申':'亥','酉':'戌','戌':'酉','亥':'申'};const liuhai=liuhaiMap[dayZhi];return{'六害':liuhai};}
getSanxing(){const dayZhi=this.dayGz[1];const sanxingMap={'子':'卯','丑':'戌','寅':'巳','卯':'子','辰':'辰','巳':'申','午':'午','未':'丑','申':'寅','酉':'酉','戌':'未','亥':'亥'};const sanxing=sanxingMap[dayZhi];return{'三刑':sanxing};}
getRima(){const dayZhi=this.dayGz[1];const rimaMap={'子':'寅','丑':'亥','寅':'申','卯':'巳','辰':'寅','巳':'亥','午':'申','未':'巳','申':'寅','酉':'亥','戌':'申','亥':'巳'};const rima=rimaMap[dayZhi];return{'日马':rima};}
getDayHuagai(){const dayZhi=this.dayGz[1];const dayHuagaiMap={'子':'辰','丑':'丑','寅':'戌','卯':'未','辰':'辰','巳':'丑','午':'戌','未':'未','申':'辰','酉':'丑','戌':'戌','亥':'未'};const dayHuagai=dayHuagaiMap[dayZhi];return{'华盖':dayHuagai};}
getPosui(){const dayZhi=this.dayGz[1];const posuiMap={'子':'巳','丑':'丑','寅':'酉','卯':'巳','辰':'丑','巳':'酉','午':'巳','未':'丑','申':'酉','酉':'巳','戌':'丑','亥':'酉'};const posui=posuiMap[dayZhi];return{'破碎':posui};}
getTaohua(){const dayZhi=this.dayGz[1];const taohuaMap={'子':'酉','丑':'午','寅':'卯','卯':'子','辰':'酉','巳':'午','午':'卯','未':'子','申':'酉','酉':'午','戌':'卯','亥':'子'};const taohua=taohuaMap[dayZhi];return{'桃花':taohua};}
getLeidian(){const dayZhi=this.dayGz[1];const leidianMap={'子':'辰','丑':'辰','寅':'未','卯':'未','辰':'戌','巳':'戌','午':'丑','未':'丑','申':'寅','酉':'寅','戌':'卯','亥':'卯'};const leidian=leidianMap[dayZhi];return{'雷电':leidian};}
getDayYushi(){const dayZhi=this.dayGz[1];const dayYushiMap={'子':'申','丑':'酉','寅':'戌','卯':'亥','辰':'子','巳':'丑','午':'寅','未':'卯','申':'辰','酉':'巳','戌':'午','亥':'未'};const dayYushi=dayYushiMap[dayZhi];return{'雨师':dayYushi};}
getQinglang(){const dayZhi=this.dayGz[1];const qinglangMap={'子':'午','丑':'未','寅':'申','卯':'酉','辰':'戌','巳':'亥','午':'子','未':'丑','申':'寅','酉':'卯','戌':'辰','亥':'巳'};const qinglang=qinglangMap[dayZhi];return{'晴朗':qinglang};}
getDayJiangjun(){const dayZhi=this.dayGz[1];const dayJiangjunMap={'子':'子','丑':'酉','寅':'午','卯':'卯','辰':'子','巳':'酉','午':'午','未':'卯','申':'子','酉':'酉','戌':'午','亥':'卯'};const dayJiangjun=dayJiangjunMap[dayZhi];return{'将军':dayJiangjun};}}
return{Shensha:Shensha};})();;const liuren=(()=>{'use strict';function parseDateTime(timeStr){const normalizedTimeStr=normalizeDateTimeString(timeStr);const parts=normalizedTimeStr.match(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/);if(!parts){throw new Error('Invalid time format');}
return{year:parseInt(parts[1]),month:parseInt(parts[2]),day:parseInt(parts[3]),hour:parseInt(parts[4]),minute:parseInt(parts[5]),second:parseInt(parts[6])};}
function normalizeDateTimeString(timeStr){if(typeof timeStr!=='string'){return'';}
const trimmed=timeStr.trim();if(!trimmed){return'';}
const normalized=trimmed.replace('T',' ');const parts=normalized.match(/^(\d{4}-\d{2}-\d{2}) (\d{2}):(\d{2})(?::(\d{2}))?$/);if(!parts){return normalized;}
return`${parts[1]} ${parts[2]}:${parts[3]}:${parts[4] || '00'}`;}
function hasValidBirthday(birthday){if(typeof birthday!=='string'){return false;}
const trimmed=birthday.trim();return trimmed!==''&&trimmed!=='未知';}
function getWuxing(ganOrZhi){const tianganToWuxing={'甲':'木','乙':'木','丙':'火','丁':'火','戊':'土','己':'土','庚':'金','辛':'金','壬':'水','癸':'水'};const dizhiToWuxing={'子':'水','丑':'土','寅':'木','卯':'木','辰':'土','巳':'火','午':'火','未':'土','申':'金','酉':'金','戌':'土','亥':'水'};if(ganOrZhi in tianganToWuxing){return tianganToWuxing[ganOrZhi];}
return dizhiToWuxing[ganOrZhi];}
function getYinyang(ganOrZhi){const tianganToYinyang={'甲':'阳','乙':'阴','丙':'阳','丁':'阴','戊':'阳','己':'阴','庚':'阳','辛':'阴','壬':'阳','癸':'阴'};const dizhiToYinyang={'子':'阳','丑':'阴','寅':'阳','卯':'阴','辰':'阳','巳':'阴','午':'阳','未':'阴','申':'阳','酉':'阴','戌':'阳','亥':'阴'};if(ganOrZhi in tianganToYinyang){return tianganToYinyang[ganOrZhi];}
return dizhiToYinyang[ganOrZhi];}
function getWuxingRelation(upper,lower){const wuxingXiangke={'木':'土','土':'水','水':'火','火':'金','金':'木'};const wuxingXiangsheng={'木':'火','火':'土','土':'金','金':'水','水':'木'};const upperWuxing=getWuxing(upper);const lowerWuxing=getWuxing(lower);if(upperWuxing===lowerWuxing){return'比和';}
if(wuxingXiangke[upperWuxing]===lowerWuxing){return'上克下';}
if(wuxingXiangke[lowerWuxing]===upperWuxing){return'下贼上';}
if(wuxingXiangsheng[upperWuxing]===lowerWuxing){return'上生下';}
if(wuxingXiangsheng[lowerWuxing]===upperWuxing){return'下生上';}}
function getMyWuxingRelation(myWuxing,otherWuxing){const wuxingXiangke={'木':'土','土':'水','水':'火','火':'金','金':'木'};const wuxingXiangsheng={'木':'火','火':'土','土':'金','金':'水','水':'木'};if(myWuxing===otherWuxing){return'同我';}
if(wuxingXiangke[myWuxing]===otherWuxing){return'我克';}
if(wuxingXiangsheng[myWuxing]===otherWuxing){return'我生';}
if(wuxingXiangke[otherWuxing]===myWuxing){return'克我';}
if(wuxingXiangsheng[otherWuxing]===myWuxing){return'生我';}}
function getLiuqin(relation){const liuqinMap={'生我':'父母','克我':'官鬼','我生':'子孙','我克':'妻财','同我':'兄弟'};return liuqinMap[relation];}
function createLiuren(name,birthday,gender,identity,question,questionTime){const date=parseDateTime(questionTime);const normalizedBirthday=hasValidBirthday(birthday)?birthday:'未知';const solar=Solar.fromYmdHms(date.year,date.month,date.day,date.hour,0,0);const lunar=solar.getLunar();const ganzhi=lunar.getBaZi();const dayXunshou=lunar.getDayXunExact();const dayGz=ganzhi[2];const hourGz=ganzhi[3];const xkong=lunar.getDayXunKong();const instance={name:name,birthday:normalizedBirthday,gender:gender,identity:identity,question:question,questionTime:questionTime,lunar:lunar,ganzhi:ganzhi,dayXunshou:dayXunshou,dayGz:dayGz,hourGz:hourGz,xkong:xkong};instance.dayYinyang=getDayYinyang(instance);instance.jieqi=lunar.getPrevJieQi(false).getName();instance.age=getAge(instance);instance.benming=getBenming(instance);instance.xingnian=getXingnian(instance);instance.yuejiang=getYuejiang(instance);instance.dipan=['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];instance.tianpan=getTianpan(instance);instance.xingpan=getXingpan(instance);instance.firstLesson=getFirstLesson(instance);instance.secondLesson=getSecondLesson(instance);instance.thirdLesson=getThirdLesson(instance);instance.fourthLesson=getFourthLesson(instance);instance.twelveGod=getTwelveGod(instance);instance.sike=getSike(instance);instance.firstPhaseMethod=getFirstPhaseMethod(instance);instance.firstPhase=getFirstPhase(instance);instance.middlePhase=getMiddlePhase(instance);instance.finalPhase=getFinalPhase(instance);instance.getLessonsWuxingRelation=function(){return getLessonsWuxingRelation(instance);};instance.getSanchuan=function(){return getSanchuan(instance);};instance.getSanchuanDungan=function(){return getSanchuanDungan(instance);};instance.getDunganPan=function(){return getDunganPan(instance);};instance.getLiurenPan=function(){return getLiurenPan(instance);};return instance;}
function getDayYinyang(inst){const dayGan=inst.dayGz[0];return getYinyang(dayGan);}
function getAge(inst){if(!hasValidBirthday(inst.birthday)){return'未知';}
const birthdayTime=parseDateTime(inst.birthday);const questionTime=parseDateTime(inst.questionTime);return questionTime.year-birthdayTime.year;}
function getBenming(inst){if(!hasValidBirthday(inst.birthday)){return'未知';}
const date=parseDateTime(inst.birthday);const solar=Solar.fromYmdHms(date.year,date.month,date.day,date.hour,0,0);const lunar=solar.getLunar();const ganzhi=lunar.getBaZi();return ganzhi[0];}
function getXingnian(inst){if(!hasValidBirthday(inst.birthday)){return'未知';}
const gan=['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'];const zhi=['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];const birthdayData=parseDateTime(inst.birthday);const birthdayYear=birthdayData.year;const questionTimeData=parseDateTime(inst.questionTime);const questionYear=questionTimeData.year;const xuSui=questionYear-birthdayYear+1;function mod(n,m){return((n%m)+m)%m;}
let xnGan,xnZhi;if(inst.gender==='男'){xnGan=gan[mod(2+xuSui-1,10)];xnZhi=zhi[mod(2+xuSui-1,12)];}else{xnGan=gan[mod(8-(xuSui-1),10)];xnZhi=zhi[mod(8-(xuSui-1),12)];}
return xnGan+xnZhi;}
function getYuejiang(inst){const yuejiangDirect={'雨水':'亥','惊蛰':'亥','春分':'戌','清明':'戌','谷雨':'酉','立夏':'酉','小满':'申','芒种':'申','夏至':'未','小暑':'未','大暑':'午','立秋':'午','处暑':'巳','白露':'巳','秋分':'辰','寒露':'辰','霜降':'卯','立冬':'卯','小雪':'寅','大雪':'寅','冬至':'丑','小寒':'丑','大寒':'子','立春':'子'};return yuejiangDirect[inst.jieqi];}
function getTianganPalace(tiangan){const tianganToDipan={'甲':'寅','乙':'辰','丙':'巳','丁':'未','戊':'巳','己':'未','庚':'申','辛':'戌','壬':'亥','癸':'丑'};return tianganToDipan[tiangan];}
function getDipanTiangan(dipanGan){const dipanToTiangan={'子':'','丑':'癸','寅':'甲','卯':'','辰':'乙','巳':'丙戊','午':'','未':'丁己','申':'庚','酉':'','戌':'辛','亥':'壬'};return dipanToTiangan[dipanGan];}
function getTianpan(inst){const baseDipan=['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];const baseTianpan=['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];const questionTimeZhi=inst.hourGz[1];const dipanZhiIndex=baseDipan.indexOf(questionTimeZhi);const dipanOrder=[...baseDipan.slice(dipanZhiIndex),...baseDipan.slice(0,dipanZhiIndex)];const yuejiangIndex=baseTianpan.indexOf(inst.yuejiang);const tianpanOrder=[...baseTianpan.slice(yuejiangIndex),...baseTianpan.slice(0,yuejiangIndex)];const tianpan={};for(let i=0;i<12;i++){tianpan[dipanOrder[i]]=tianpanOrder[i];}
return tianpan;}
function getXingpanMap(dayGan){const mappings={'甲':{'子':'角亢','丑':'翼轸','寅':'柳星张','卯':'井鬼','辰':'参觜','巳':'胃昴毕','午':'娄奎','未':'危室壁','申':'女虚','酉':'斗牛','戌':'尾箕','亥':'氐房心'},'己':{'子':'角亢','丑':'翼轸','寅':'柳星张','卯':'井鬼','辰':'参觜','巳':'胃昴毕','午':'娄奎','未':'危室壁','申':'女虚','酉':'斗牛','戌':'尾箕','亥':'氐房心'},'乙':{'子':'参觜','丑':'昴毕','寅':'奎娄胃','卯':'危室壁','辰':'女虚','巳':'斗牛','午':'尾箕','未':'氐房心','申':'角亢','酉':'翼轸','戌':'柳星张','亥':'井鬼'},'庚':{'子':'参觜','丑':'昴毕','寅':'奎娄胃','卯':'危室壁','辰':'女虚','巳':'斗牛','午':'尾箕','未':'氐房心','申':'角亢','酉':'翼轸','戌':'柳星张','亥':'井鬼'},'丙':{'子':'奎娄','丑':'危室壁','寅':'女虚','卯':'斗牛','辰':'尾箕','巳':'氐房心','午':'角亢','未':'翼轸','申':'井鬼','酉':'柳星张','戌':'参觜','亥':'胃昴毕'},'辛':{'子':'奎娄','丑':'危室壁','寅':'女虚','卯':'斗牛','辰':'尾箕','巳':'氐房心','午':'角亢','未':'翼轸','申':'井鬼','酉':'柳星张','戌':'参觜','亥':'胃昴毕'},'戊':{'子':'尾箕','丑':'氐房心','寅':'角亢','卯':'翼轸','辰':'柳星张','巳':'井鬼','午':'毕参觜','未':'胃昴','申':'奎娄','酉':'危室壁','戌':'女虚','亥':'斗牛'},'癸':{'子':'尾箕','丑':'氐房心','寅':'角亢','卯':'翼轸','辰':'柳星张','巳':'井鬼','午':'毕参觜','未':'胃昴','申':'奎娄','酉':'危室壁','戌':'女虚','亥':'斗牛'},'丁':{'子':'女虚','丑':'斗牛','寅':'尾箕','卯':'氐房心','辰':'角亢','巳':'翼轸','午':'柳星张','未':'井鬼','申':'毕参觜','酉':'胃昴','戌':'奎娄','亥':'危室壁'},'壬':{'子':'女虚','丑':'斗牛','寅':'尾箕','卯':'氐房心','辰':'角亢','巳':'翼轸','午':'柳星张','未':'井鬼','申':'毕参觜','酉':'胃昴','戌':'奎娄','亥':'危室壁'}};return mappings[dayGan]||{};}
function getXingpan(inst){const dayGan=inst.dayGz[0];const zhiList=['巳','午','未','申','酉','戌','亥','子','丑','寅','卯','辰'];const hourSuMapping=getXingpanMap(dayGan);const starPan={};for(const zhi of zhiList){starPan[zhi]=hourSuMapping[zhi]||'';}
return starPan;}
function getFirstLesson(inst){const firstGan=inst.dayGz[0];const ganPalace=getTianganPalace(firstGan);const secondGan=inst.tianpan[ganPalace];return[firstGan,secondGan];}
function getSecondLesson(inst){const firstGan=inst.firstLesson[1];const secondGan=inst.tianpan[firstGan];return[firstGan,secondGan];}
function getThirdLesson(inst){const firstGan=inst.dayGz[1];const secondGan=inst.tianpan[firstGan];return[firstGan,secondGan];}
function getFourthLesson(inst){const firstGan=inst.thirdLesson[1];const secondGan=inst.tianpan[firstGan];return[firstGan,secondGan];}
function getSike(inst){const lessonsGod=getLessonsGod(inst);return{'一课':inst.firstLesson,'一课神':lessonsGod[0],'二课':inst.secondLesson,'二课神':lessonsGod[1],'三课':inst.thirdLesson,'三课神':lessonsGod[2],'四课':inst.fourthLesson,'四课神':lessonsGod[3]};}
function getLessonsGod(inst){const shenpan=inst.twelveGod;const tianpan=inst.tianpan;const reverseTianpan={};for(const[key,value]of Object.entries(tianpan)){reverseTianpan[value]=key;}
const firstLessonDipan=reverseTianpan[inst.firstLesson[1]];const secondLessonDipan=reverseTianpan[inst.secondLesson[1]];const thirdLessonDipan=reverseTianpan[inst.thirdLesson[1]];const fourthLessonDipan=reverseTianpan[inst.fourthLesson[1]];return[shenpan[firstLessonDipan],shenpan[secondLessonDipan],shenpan[thirdLessonDipan],shenpan[fourthLessonDipan]];}
function getLessonsWuxingRelation(inst){const lessons=[inst.firstLesson,inst.secondLesson,inst.thirdLesson,inst.fourthLesson];const wuxingRelation=[];let ke=1;for(const lesson of lessons){const lower=lesson[0];const upper=lesson[1];const relation=getWuxingRelation(upper,lower);wuxingRelation.push({'课':`${ke}课`,'干支':lesson,'下五行':getWuxing(lower),'上五行':getWuxing(upper),'下阴阳':getYinyang(lower),'上阴阳':getYinyang(upper),'关系':relation});ke++;}
return wuxingRelation;}
function getFirstPhaseMethod(inst){const lessonsWuxingRelation=getLessonsWuxingRelation(inst);let zeiCount=0;let keCount=0;for(const lesson of lessonsWuxingRelation){if(lesson['关系']==='下贼上')zeiCount++;if(lesson['关系']==='上克下')keCount++;}
if(isFanyin(inst)){if(zeiCount>=1||keCount>=1){return'反吟有克法';}
return'反吟无克法';}
if(isFuyin(inst)){return'伏吟法';}
if(zeiCount+keCount>0){if(zeiCount+keCount===1){return'贼克法';}else if(zeiCount===1&&keCount===1){return'贼克法';}else if(zeiCount===0&&keCount===1){return'贼克法';}else if(zeiCount>=2||keCount>=2){return'比用法';}}
if(zeiCount+keCount===0){if(isBazhuan(inst)){return'八专法';}
if(isYaoke(inst)){return'遥克法';}
if(isBieze(inst)){return'别责法';}
return'昴星法';}}
function isFanyin(inst){const chongDict={'子':'午','午':'子','丑':'未','未':'丑','寅':'申','申':'寅','卯':'酉','酉':'卯','辰':'戌','戌':'辰','巳':'亥','亥':'巳'};for(const dizhi of inst.dipan){if(inst.tianpan[dizhi]!==chongDict[dizhi]){return false;}}
return true;}
function isFuyin(inst){for(const dizhi of inst.dipan){if(inst.tianpan[dizhi]!==dizhi){return false;}}
return true;}
function isBazhuan(inst){const dayGan=inst.dayGz[0];const dayZhi=inst.dayGz[1];const dayGanInPalace=getTianganPalace(dayGan);return dayZhi===dayGanInPalace;}
function isYaoke(inst){const dayGan=inst.dayGz[0];const dayGanWuxing=getWuxing(dayGan);const lessons=[inst.firstLesson,inst.secondLesson,inst.thirdLesson,inst.fourthLesson];const upperGods=lessons.map(lesson=>lesson[1]);const wuxingXiangke={'木':'土','土':'水','水':'火','火':'金','金':'木'};for(const upper of upperGods){const upperWuxing=getWuxing(upper);if(wuxingXiangke[dayGanWuxing]===upperWuxing){return true;}
if(wuxingXiangke[upperWuxing]===dayGanWuxing){return true;}}
return false;}
function isBieze(inst){const lessons=[inst.firstLesson.toString(),inst.secondLesson.toString(),inst.thirdLesson.toString(),inst.fourthLesson.toString()];const seen=new Set();for(const lesson of lessons){if(seen.has(lesson)){return true;}
seen.add(lesson);}
return false;}
function getFirstPhase(inst){const firstPhaseMethod=inst.firstPhaseMethod;if(firstPhaseMethod==='贼克法'){return zeikeMethod(inst);}
if(firstPhaseMethod==='比用法'){return biyongMethod(inst);}
if(firstPhaseMethod==='遥克法'){return yaokeMethod(inst);}
if(firstPhaseMethod==='别责法'){return biezeMethod(inst);}
if(firstPhaseMethod==='八专法'){return bazhuanMethod(inst);}
if(firstPhaseMethod==='昴星法'){return maoxingMethod(inst);}
if(firstPhaseMethod==='反吟无克法'){return fanyinMethod(inst);}
if(firstPhaseMethod==='反吟有克法'){return fanyinHasKeMethod(inst);}
if(firstPhaseMethod==='伏吟法'){return fuyinMethod(inst);}}
function zeikeMethod(inst){const lessonsWuxingRelation=getLessonsWuxingRelation(inst);for(const lesson of lessonsWuxingRelation){if(lesson['关系']==='下贼上'){return lesson['干支'][1];}
if(lesson['关系']==='上克下'){return lesson['干支'][1];}}}
function biyongMethod(inst){const lessonsWuxingRelation=getLessonsWuxingRelation(inst);const candidatePhases=[];for(const lesson of lessonsWuxingRelation){if(lesson['关系']==='下贼上'||lesson['关系']==='上克下'){const upper=lesson['干支'][1];const upperYinyang=getYinyang(upper);if(upperYinyang===inst.dayYinyang){candidatePhases.push({'课':lesson['课'],'上神':upper,'干支':lesson['干支'],'下五行':lesson['下五行'],'上五行':lesson['上五行'],'下阴阳':lesson['下阴阳'],'上阴阳':lesson['上阴阳'],'关系':lesson['关系']});}}}
if(candidatePhases.length===0){for(const lesson of lessonsWuxingRelation){if(lesson['关系']==='下贼上'||lesson['关系']==='上克下'){candidatePhases.push({'课':lesson['课'],'上神':lesson['干支'][1],'干支':lesson['干支'],'下五行':lesson['下五行'],'上五行':lesson['上五行'],'下阴阳':lesson['下阴阳'],'上阴阳':lesson['上阴阳'],'关系':lesson['关系']});}}}
if(candidatePhases.length===1){return candidatePhases[0]['上神'];}
if(candidatePhases.length>1){let zeiCount=0;let keCount=0;for(const lesson of candidatePhases){if(lesson['关系']==='下贼上')zeiCount++;if(lesson['关系']==='上克下')keCount++;}
if(zeiCount===1){for(const lesson of candidatePhases){if(lesson['关系']==='下贼上'){return lesson['上神'];}}}else{return shehaiMethod(inst,candidatePhases);}}}
function shehaiMethod(inst,candidatePhases){if(candidatePhases[0]['关系']==='下贼上'){for(const candidate of candidatePhases){candidate['深度']=getShehaiDepthByZei(inst,candidate['上神']);}}
if(candidatePhases[0]['关系']==='上克下'){for(const candidate of candidatePhases){candidate['深度']=getShehaiDepthByKe(inst,candidate['上神']);}}
candidatePhases.sort((a,b)=>b['深度']-a['深度']);const maxDepth=candidatePhases[0]['深度'];const maxDepthCandidates=candidatePhases.filter(c=>c['深度']===maxDepth);if(maxDepthCandidates.length===1){return maxDepthCandidates[0]['上神'];}else{return selectByMengzhongji(inst,maxDepthCandidates);}}
function getShehaiDepthByKe(inst,upper){return getDipanKeDepth(inst,upper)+getTianganKeDepth(inst,upper);}
function getDipanKeDepth(inst,upper){const dipanPath=getDipanPath(inst,upper);let depth=0;const wuxingXiangke={'木':'土','土':'水','水':'火','火':'金','金':'木'};const upperWuxing=getWuxing(upper);const upperWuxingXiangke=wuxingXiangke[upperWuxing];for(const dizhi of dipanPath){const dizhiWuxing=getWuxing(dizhi);if(dizhiWuxing===upperWuxingXiangke){depth++;}}
return depth;}
function getDipanPath(inst,upper){const baseDipan=['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];const baseTianpan=inst.tianpan;const tianpan={};for(const[key,value]of Object.entries(baseTianpan)){tianpan[value]=key;}
const startZhi=tianpan[upper];const endZhi=upper;const startIndex=baseDipan.indexOf(startZhi);const endIndex=baseDipan.indexOf(endZhi);if(startIndex<=endIndex){return baseDipan.slice(startIndex,endIndex+1);}else{return[...baseDipan.slice(startIndex),...baseDipan.slice(0,endIndex+1)];}}
function getTianganKeDepth(inst,upper){const tianganPath=getTianganPath(inst,upper);let depth=0;const wuxingXiangke={'木':'土','土':'水','水':'火','火':'金','金':'木'};const upperWuxing=getWuxing(upper);const upperWuxingXiangke=wuxingXiangke[upperWuxing];for(const tiangan of tianganPath){const tianganWuxing=getWuxing(tiangan);if(tianganWuxing===upperWuxingXiangke){depth++;}}
return depth;}
function getTianganPath(inst,upper){const dipanPath=getDipanPath(inst,upper);const tianganPath=[];for(const dizhi of dipanPath){const tiangan=getDipanTiangan(dizhi);if(tiangan){for(const char of tiangan){tianganPath.push(char);}}}
return tianganPath;}
function getShehaiDepthByZei(inst,upper){return getDipanZeiDepth(inst,upper)+getTianganZeiDepth(inst,upper);}
function getDipanZeiDepth(inst,upper){const dipanPath=getDipanPath(inst,upper);let depth=0;const wuxingBeike={'木':'金','土':'木','水':'土','火':'水','金':'火'};const upperWuxing=getWuxing(upper);const upperWuxingBeike=wuxingBeike[upperWuxing];for(const dizhi of dipanPath){const dizhiWuxing=getWuxing(dizhi);if(dizhiWuxing===upperWuxingBeike){depth++;}}
return depth;}
function getTianganZeiDepth(inst,upper){const tianganPath=getTianganPath(inst,upper);let depth=0;const wuxingBeike={'木':'金','土':'木','水':'土','火':'水','金':'火'};const upperWuxing=getWuxing(upper);const upperWuxingBeike=wuxingBeike[upperWuxing];for(const tiangan of tianganPath){const tianganWuxing=getWuxing(tiangan);if(tianganWuxing===upperWuxingBeike){depth++;}}
return depth;}
function selectByMengzhongji(inst,candidates){const meng=['寅','申','巳','亥'];const zhong=['子','午','卯','酉'];const ji=['辰','戌','丑','未'];const priorityGroups={1:[],2:[],3:[]};for(const candidate of candidates){const lower=candidate['干支'][0];if(meng.includes(lower)){priorityGroups[1].push(candidate);}else if(zhong.includes(lower)){priorityGroups[2].push(candidate);}else if(ji.includes(lower)){priorityGroups[3].push(candidate);}}
let candidatesInGroup=[];for(const priority of[1,2,3]){if(priorityGroups[priority].length>0){candidatesInGroup=priorityGroups[priority];break;}}
if(candidatesInGroup.length===1){return candidatesInGroup[0]['干支'][1];}
return zhuixiafuMethod(inst);}
function zhuixiafuMethod(inst){if(inst.dayYinyang==='阳'){return inst.firstLesson[1];}else{const dayZhi=inst.dayGz[1];return inst.tianpan[dayZhi];}}
function yaokeMethod(inst){const dayGan=inst.dayGz[0];const dayGanWuxing=getWuxing(dayGan);const dayYinyang=inst.dayYinyang;const lessons=[inst.firstLesson,inst.secondLesson,inst.thirdLesson,inst.fourthLesson];const wuxingXiangke={'木':'土','土':'水','水':'火','火':'金','金':'木'};const wuxingBeike={'木':'金','土':'木','水':'土','火':'水','金':'火'};const keDayGan=wuxingBeike[dayGanWuxing];const dayGanKe=wuxingXiangke[dayGanWuxing];const guiLessons=[];const caiLessons=[];for(const lesson of lessons){const upperGod=lesson[1];const upperGodWuxing=getWuxing(upperGod);if(upperGodWuxing===keDayGan){guiLessons.push(lesson);}else if(upperGodWuxing===dayGanKe){caiLessons.push(lesson);}}
const guiCount=guiLessons.length;const caiCount=caiLessons.length;if(guiCount>=1){if(guiCount===1){return guiLessons[0][1];}else{const sameYinyang=[];for(const lesson of guiLessons){const upperGod=lesson[1];const upperGodYinyang=getYinyang(upperGod);if(upperGodYinyang===dayYinyang){sameYinyang.push(lesson);}}
if(sameYinyang.length>0){return sameYinyang[0][1];}else{return guiLessons[0][1];}}}
else if(caiCount>=1){if(caiCount===1){return caiLessons[0][1];}else{const sameYinyang=[];for(const lesson of caiLessons){const upperGod=lesson[1];const upperGodYinyang=getYinyang(upperGod);if(upperGodYinyang===dayYinyang){sameYinyang.push(lesson);}}
if(sameYinyang.length>0){return sameYinyang[0][1];}else{return caiLessons[0][1];}}}}
function biezeMethod(inst){const sanhe={'寅':['寅','午','戌'],'申':['申','子','辰'],'巳':['巳','酉','丑'],'亥':['亥','卯','未']};const wuhe={'甲':'己','乙':'庚','丙':'辛','丁':'壬','戊':'癸','己':'甲','庚':'乙','辛':'丙','壬':'丁','癸':'戊'};if(inst.dayYinyang==='阳'){const dayGan=inst.dayGz[0];const dayGanWuhe=wuhe[dayGan];const palace=getTianganPalace(dayGanWuhe);return inst.tianpan[palace];}else{const zhi=inst.dayGz[1];for(const[key,values]of Object.entries(sanhe)){if(values.includes(zhi)){const index=values.indexOf(zhi);const nextIndex=(index+1)%3;return values[nextIndex];}}}}
function bazhuanMethod(inst){const baseDipan=['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];if(inst.dayYinyang==='阳'){const upperGod=inst.firstLesson[1];const upperGodIndex=baseDipan.indexOf(upperGod);const upperGodThird=baseDipan[(upperGodIndex+2)%12];return upperGodThird;}else{const upperGod=inst.fourthLesson[1];const upperGodIndex=baseDipan.indexOf(upperGod);const upperGodThird=baseDipan[(upperGodIndex-2+12)%12];return upperGodThird;}}
function maoxingMethod(inst){if(inst.dayYinyang==='阳'){return inst.tianpan['酉'];}else{const tianpanToDizhi={};for(const[key,value]of Object.entries(inst.tianpan)){tianpanToDizhi[value]=key;}
return tianpanToDizhi['酉'];}}
function fuyinMethod(inst){const lessonsWuxingRelation=getLessonsWuxingRelation(inst);let zeiCount=0;let keCount=0;for(const lesson of lessonsWuxingRelation){if(lesson['关系']==='下贼上')zeiCount++;if(lesson['关系']==='上克下')keCount++;}
if(zeiCount===1||keCount===1){for(const lesson of lessonsWuxingRelation){if(lesson['关系']==='下贼上'){return lesson['干支'][1];}
if(lesson['关系']==='上克下'){return lesson['干支'][1];}}}
if(zeiCount===0&&keCount===0){if(inst.dayYinyang==='阳'){return inst.firstLesson[1];}else{return inst.thirdLesson[1];}}}
function fanyinMethod(inst){return getYima(inst);}
function fanyinHasKeMethod(inst){const lessonsWuxingRelation=getLessonsWuxingRelation(inst);let zeiCount=0;let keCount=0;for(const lesson of lessonsWuxingRelation){if(lesson['关系']==='下贼上')zeiCount++;if(lesson['关系']==='上克下')keCount++;}
if(zeiCount===1||keCount===1){for(const lesson of lessonsWuxingRelation){if(lesson['关系']==='下贼上'){return lesson['干支'][1];}
if(lesson['关系']==='上克下'){return lesson['干支'][1];}}}
if(zeiCount>=2||keCount>=2){return biyongMethod(inst);}}
function getYima(inst){const dayZhi=inst.dayGz[1];const rimaMap={'子':'寅','丑':'亥','寅':'申','卯':'巳','辰':'寅','巳':'亥','午':'申','未':'巳','申':'寅','酉':'亥','戌':'申','亥':'巳'};return rimaMap[dayZhi];}
function getMiddlePhase(inst){if(inst.firstPhaseMethod==='伏吟法'){return getFuyinMiddlePhase(inst);}
if(inst.firstPhaseMethod==='反吟无克法'){return inst.thirdLesson[1];}
if(inst.firstPhaseMethod==='别责法'){const dayGan=inst.dayGz[0];const palace=getTianganPalace(dayGan);return inst.tianpan[palace];}
if(inst.firstPhaseMethod==='八专法'){const dayGan=inst.dayGz[0];const palace=getTianganPalace(dayGan);return inst.tianpan[palace];}
if(inst.firstPhaseMethod==='昴星法'){if(inst.dayYinyang==='阳'){const dayZhi=inst.dayGz[1];return inst.tianpan[dayZhi];}else{const dayGan=inst.dayGz[0];const palace=getTianganPalace(dayGan);return inst.tianpan[palace];}}
return inst.tianpan[inst.firstPhase];}
function getFuyinMiddlePhase(inst){const xing={'丑':'戌','戌':'未','未':'丑','寅':'巳','巳':'申','申':'寅','子':'卯','卯':'子'};const ziXing=['辰','午','酉','亥'];if(ziXing.includes(inst.firstPhase)){if(inst.dayYinyang==='阳'){return inst.thirdLesson[1];}else{return inst.firstLesson[1];}}else{return xing[inst.firstPhase];}}
function getFinalPhase(inst){if(inst.firstPhaseMethod==='伏吟法'){return getFuyinFinalPhase(inst);}
if(inst.firstPhaseMethod==='反吟无克法'){return inst.firstLesson[1];}
if(inst.firstPhaseMethod==='别责法'){const dayGan=inst.dayGz[0];const palace=getTianganPalace(dayGan);return inst.tianpan[palace];}
if(inst.firstPhaseMethod==='八专法'){const dayGan=inst.dayGz[0];const palace=getTianganPalace(dayGan);return inst.tianpan[palace];}
if(inst.firstPhaseMethod==='昴星法'){if(inst.dayYinyang==='阳'){const dayGan=inst.dayGz[0];const palace=getTianganPalace(dayGan);return inst.tianpan[palace];}else{const dayZhi=inst.dayGz[1];return inst.tianpan[dayZhi];}}
return inst.tianpan[inst.middlePhase];}
function getFuyinFinalPhase(inst){const xing={'丑':'戌','戌':'未','未':'丑','寅':'巳','巳':'申','申':'寅','子':'卯','卯':'子'};const chongDict={'子':'午','午':'子','丑':'未','未':'丑','寅':'申','申':'寅','卯':'酉','酉':'卯','辰':'戌','戌':'辰','巳':'亥','亥':'巳'};const ziXing=['辰','午','酉','亥'];if(ziXing.includes(inst.middlePhase)){return chongDict[inst.middlePhase];}else{return xing[inst.middlePhase];}}
function getTwelveGod(inst){const dipan=inst.dipan;const tianpan=inst.tianpan;const twelveGod=['贵人','腾蛇','朱雀','六合','勾陈','青龙','天空','白虎','太常','玄武','太阴','天后'];const orderList=['亥','子','丑','寅','卯','辰'];const guirenGod=getGuirenGod(inst);const reverseTianpan={};for(const[key,value]of Object.entries(tianpan)){reverseTianpan[value]=key;}
const guirenGodPlace=reverseTianpan[guirenGod];const guirenIndex=dipan.indexOf(guirenGodPlace);let dipanOrder;if(orderList.includes(guirenGodPlace)){dipanOrder=[...dipan.slice(guirenIndex),...dipan.slice(0,guirenIndex)];}else{dipanOrder=[...dipan.slice(0,guirenIndex+1).reverse(),...dipan.slice(guirenIndex+1).reverse()];}
const twelveGodPan={};for(let i=0;i<12;i++){twelveGodPan[dipanOrder[i]]=twelveGod[i];}
return twelveGodPan;}
function getGuirenGod(inst){const dayGan=inst.dayGz[0];const hourZhi=inst.hourGz[1];const daytime=['卯','辰','巳','午','未','申'];const guirenMap={'甲':{'day':'丑','night':'未'},'戊':{'day':'丑','night':'未'},'庚':{'day':'丑','night':'未'},'乙':{'day':'子','night':'申'},'己':{'day':'子','night':'申'},'丙':{'day':'亥','night':'酉'},'丁':{'day':'亥','night':'酉'},'壬':{'day':'巳','night':'卯'},'癸':{'day':'巳','night':'卯'},'辛':{'day':'午','night':'寅'}};const timePeriod=daytime.includes(hourZhi)?'day':'night';return guirenMap[dayGan][timePeriod];}
function getDungan(dayXunshou,phase){const jiaziXun={'子':'甲','丑':'乙','寅':'丙','卯':'丁','辰':'戊','巳':'己','午':'庚','未':'辛','申':'壬','酉':'癸','戌':'空','亥':'空'};const jiaxuXun={'戌':'甲','亥':'乙','子':'丙','丑':'丁','寅':'戊','卯':'己','辰':'庚','巳':'辛','午':'壬','未':'癸','申':'空','酉':'空'};const jiashenXun={'申':'甲','酉':'乙','戌':'丙','亥':'丁','子':'戊','丑':'己','寅':'庚','卯':'辛','辰':'壬','巳':'癸','午':'空','未':'空'};const jiawuXun={'午':'甲','未':'乙','申':'丙','酉':'丁','戌':'戊','亥':'己','子':'庚','丑':'辛','寅':'壬','卯':'癸','辰':'空','巳':'空'};const jiachenXun={'辰':'甲','巳':'乙','午':'丙','未':'丁','申':'戊','酉':'己','戌':'庚','亥':'辛','子':'壬','丑':'癸','寅':'空','卯':'空'};const jiayinXun={'寅':'甲','卯':'乙','辰':'丙','巳':'丁','午':'戊','未':'己','申':'庚','酉':'辛','戌':'壬','亥':'癸','子':'空','丑':'空'};const xunMap={'甲子':jiaziXun,'甲戌':jiaxuXun,'甲申':jiashenXun,'甲午':jiawuXun,'甲辰':jiachenXun,'甲寅':jiayinXun};return xunMap[dayXunshou][phase];}
function getDunganPan(inst){const tiangan=['甲','乙','丙','丁','戊','己','庚','辛','壬','癸','空','空'];const firstPhaseDungan=getSanchuanDungan(inst)['初传'];const firstPhaseDunganIndex=tiangan.indexOf(firstPhaseDungan);const frontTianganOrder=tiangan.slice(firstPhaseDunganIndex);const backTianganOrder=tiangan.slice(0,firstPhaseDunganIndex);const tianganOrder=[...frontTianganOrder,...backTianganOrder];const tianpan=inst.tianpan;const dipan=['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];const reversedTianpan={};for(const[key,value]of Object.entries(tianpan)){reversedTianpan[value]=key;}
const dipanPalace=reversedTianpan[inst.firstPhase];const dipanPalaceIndex=dipan.indexOf(dipanPalace);const frontDipanOrder=dipan.slice(dipanPalaceIndex);const backDipanOrder=dipan.slice(0,dipanPalaceIndex);const dipanOrder=[...frontDipanOrder,...backDipanOrder];const dunganPan={};for(let i=0;i<12;i++){dunganPan[dipanOrder[i]]=tianganOrder[i];}
return dunganPan;}
function getSanchuan(inst){const sanchuanLiuqin=getSanchuanLiuqin(inst);const sanchuanGod=getSanchuanGod(inst);const dungan=getSanchuanDungan(inst);return{'初传':inst.firstPhase,'初传六亲':sanchuanLiuqin['初传'],'初传十二神':sanchuanGod['初传'],'初传遁干':dungan['初传'],'中传':inst.middlePhase,'中传六亲':sanchuanLiuqin['中传'],'中传十二神':sanchuanGod['中传'],'中传遁干':dungan['中传'],'末传':inst.finalPhase,'末传六亲':sanchuanLiuqin['末传'],'末传十二神':sanchuanGod['末传'],'末传遁干':dungan['末传']};}
function getSanchuanLiuqin(inst){const firstPhaseWuxing=getWuxing(inst.firstPhase);const middlePhaseWuxing=getWuxing(inst.middlePhase);const finalPhaseWuxing=getWuxing(inst.finalPhase);const myWuxing=getWuxing(inst.dayGz[0]);const firstPhaseWuxingRelation=getMyWuxingRelation(myWuxing,firstPhaseWuxing);const middlePhaseWuxingRelation=getMyWuxingRelation(myWuxing,middlePhaseWuxing);const finalPhaseWuxingRelation=getMyWuxingRelation(myWuxing,finalPhaseWuxing);const firstPhaseLiuqin=getLiuqin(firstPhaseWuxingRelation);const middlePhaseLiuqin=getLiuqin(middlePhaseWuxingRelation);const finalPhaseLiuqin=getLiuqin(finalPhaseWuxingRelation);return{'初传':firstPhaseLiuqin,'中传':middlePhaseLiuqin,'末传':finalPhaseLiuqin};}
function getSanchuanGod(inst){const shenpan=inst.twelveGod;const tianpan=inst.tianpan;const reversedTianpan={};for(const[key,value]of Object.entries(tianpan)){reversedTianpan[value]=key;}
const firstPhaseDipan=reversedTianpan[inst.firstPhase];const middlePhaseDipan=reversedTianpan[inst.middlePhase];const finalPhaseDipan=reversedTianpan[inst.finalPhase];return{'初传':shenpan[firstPhaseDipan],'中传':shenpan[middlePhaseDipan],'末传':shenpan[finalPhaseDipan]};}
function getSanchuanDungan(inst){const firstPhaseDungan=getDungan(inst.dayXunshou,inst.firstPhase);const middlePhaseDungan=getDungan(inst.dayXunshou,inst.middlePhase);const finalPhaseDungan=getDungan(inst.dayXunshou,inst.finalPhase);return{'初传':firstPhaseDungan,'中传':middlePhaseDungan,'末传':finalPhaseDungan};}
function getLiurenPan(inst){const shensha=new liurenShensha.Shensha(inst.questionTime);return{'占问人':inst.name,'性别':inst.gender,'身份':inst.identity,'生日':inst.birthday,'年龄':inst.age,'本命':inst.benming,'行年':inst.xingnian,'占问时间':inst.questionTime,'干支时间':inst.ganzhi,'日干支':inst.dayGz,'旬空':inst.xkong,'占问问题':inst.question,'月将':inst.yuejiang,'地盘':inst.dipan,'地盘对应天盘':inst.tianpan,'地盘对应神盘':inst.twelveGod,'地盘对应星盘':inst.xingpan,'地盘对应天干':getDunganPan(inst),'四课':inst.sike,'四课五行关系':getLessonsWuxingRelation(inst),'发初传方法':inst.firstPhaseMethod,'三传':getSanchuan(inst),'年煞':shensha.getNiansha(),'月煞':shensha.getYuesha(),'日煞':shensha.getRisha()};}
function formatMarkdownValue(value){if(value&&typeof value==='object'&&!Array.isArray(value)&&value['关系']){return value['关系'];}
if(value&&typeof value==='object'&&!Array.isArray(value)){return Object.entries(value).map(([key,item])=>`${key}:${formatMarkdownValue(item)}`).join('；');}
if(Array.isArray(value)){return value.map(item=>String(item)).join(' / ');}
return value===null||value===undefined?'':String(value);}
function formatGanzhiTime(value){if(Array.isArray(value)){const labels=['年柱','月柱','日柱','时柱'];return value.map((item,index)=>`${labels[index] || `第${index+1}柱`}=${item}`).join(' / ');}
return formatMarkdownValue(value);}
function formatSikeSummary(sike,key){const lesson=sike[key]||[];return[lesson[0]||'',lesson[1]||''].filter(Boolean).join(' / ');}
function formatSanchuanSummary(sanchuan,key){return[sanchuan[`${key}六亲`]||'',sanchuan[`${key}遁干`]||'',sanchuan[key]||'',sanchuan[`${key}十二神`]||'',].filter(Boolean).join(' ');}
function formatPaipanMarkdown(pan){const sike=pan['四课']||{};const relations=pan['四课五行关系']||[];const sanchuan=pan['三传']||{};const dizhiList=pan['地盘']||[];const tianpan=pan['地盘对应天盘']||{};const shenpan=pan['地盘对应神盘']||{};const xingpan=pan['地盘对应星盘']||{};const dungan=pan['地盘对应天干']||{};const lines=['# 大六壬排盘','','### 基本信息',`- 占问人：${pan['占问人'] || ''}`,`- 性别：${pan['性别'] || ''}`,`- 身份：${pan['身份'] || ''}`,`- 生日：${pan['生日'] || ''}`,`- 年龄：${pan['年龄'] || ''}`,`- 占问时间：${pan['占问时间'] || ''}`,`- 起课干支：${formatGanzhiTime(pan['干支时间'] || [])}`,`- 日干支：${pan['日干支'] || ''}`,`- 旬空：${pan['旬空'] || ''}`,`- 月将：${pan['月将'] || ''}`,`- 本命：${pan['本命'] || ''}`,`- 行年：${pan['行年'] || ''}`,`- 占问问题：${pan['占问问题'] || ''}`,'','### 排盘摘要',`- 发用：${sanchuan['初传'] || ''}`,`- 三传：初传 ${sanchuan['初传'] || ''} / 中传 ${sanchuan['中传'] || ''} / 末传 ${sanchuan['末传'] || ''}`,`- 发初传方法：${pan['发初传方法'] || ''}`,`- 一课：${formatSikeSummary(sike, '一课')}`,`- 二课：${formatSikeSummary(sike, '二课')}`,`- 三课：${formatSikeSummary(sike, '三课')}`,`- 四课：${formatSikeSummary(sike, '四课')}`,'','### 详细排盘（核心）','','#### 三传',''];['初传','中传','末传'].forEach((key)=>{lines.push(`- **${key}**：${formatSanchuanSummary(sanchuan, key)}`);});lines.push('','#### 四课');['一课','二课','三课','四课'].forEach((key,index)=>{const lesson=sike[key]||[];lines.push(`**${key}**：`,`  - 下神：${lesson[0] || ''}`,`  - 上神：${lesson[1] || ''}`,`  - 课神：${sike[`${key}神`] || ''}`,`  - 关系：${formatMarkdownValue(relations[index] || '')}`,'');});lines.push('#### 天地盘','| 地支 | 天盘 | 天将 | 天星 | 遁干 |','| --- | --- | --- | --- | --- |');dizhiList.forEach((dizhi)=>{lines.push(`| ${dizhi} | ${tianpan[dizhi] || ''} | ${shenpan[dizhi] || ''} | ${xingpan[dizhi] || ''} | ${dungan[dizhi] || ''} |`);});lines.push('','### 神煞（后续阶段参考）',`- 年煞：${formatMarkdownValue(pan['年煞'] || {})}`,`- 月煞：${formatMarkdownValue(pan['月煞'] || {})}`,`- 日煞：${formatMarkdownValue(pan['日煞'] || {})}`);return lines.join('\n').trim();}
function paipan(name,birthday,gender,identity,question,time){const liurenInstance=createLiuren(name,birthday,gender,identity,question,time);return liurenInstance.getLiurenPan();}
return{paipan:paipan,formatPaipanMarkdown:formatPaipanMarkdown};})();;const liurenPaipan=(()=>{'use strict';let isRestoring=false;let liurenBaseData=null;let hasInitializedInputListeners=false;const DIZHI_MAP=['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];const DIZHI_PINYIN=['zi','chou','yin','mao','chen','si','wu','wei','shen','you','xu','hai'];async function init(){initInputListener();const data=await calculatePaipan();if(data){updateAllPanels(data);}
await initInputsStorage();}
async function initInputsStorage(){liurenLocalStorage.batchUpdateStorageData(buildStorageInputData());}
function buildStorageInputData(){return{name:document.getElementById('name')?.value||'',gender:document.getElementById('gender')?.value||'',birthday:document.getElementById('birthday')?.value||'',identity:document.getElementById('identity')?.value||'',question:document.getElementById('question')?.value||'',time:document.getElementById('time')?.value||'',mode:document.getElementById('mode')?.value||liurenLocalStorage.DEFAULT_DATA.mode,category:document.getElementById('agent')?.getAttribute('data-category')||'',agent:document.getElementById('agent')?.value||'',};}
function syncFormFieldsToStoredGuaxiang(formData){const storedData=liurenLocalStorage.getData();if(!storedData||!storedData.baseGuaxiang){return;}
storedData.baseGuaxiang['占问人']=formData.name||'';storedData.baseGuaxiang['性别']=formData.gender||'';storedData.baseGuaxiang['生日']=formData.birthday||'';storedData.baseGuaxiang['身份']=formData.identity||'';storedData.baseGuaxiang['占问问题']=formData.question||'';storedData.baseGuaxiang['占问时间']=formData.time||storedData.baseGuaxiang['占问时间']||'';liurenLocalStorage.batchUpdateStorageData({baseGuaxiang:storedData.baseGuaxiang,markdownGuaxiang:buildMarkdownGuaxiang(storedData.baseGuaxiang),});}
function syncFormDataToStorage(){const inputData=buildStorageInputData();liurenLocalStorage.batchUpdateStorageData(inputData);syncFormFieldsToStoredGuaxiang(inputData);}
function initInputListener(){if(hasInitializedInputListeners){return;}
const inputFields=['name','gender','birthday','identity','question','time','mode','agent',];inputFields.forEach(field=>{const element=document.getElementById(field);if(!element){return;}
element.addEventListener('change',async function(){liurenLocalStorage.setStorageData(field,this.value);if(field==='question'){syncFormFieldsToStoredGuaxiang(buildStorageInputData());}
if(!isRestoring){const data=await calculatePaipan();if(data){updateAllPanels(data);}}})})
const questionElement=document.getElementById('question');if(questionElement){questionElement.addEventListener('input',function(){liurenLocalStorage.setStorageData('question',this.value);syncFormFieldsToStoredGuaxiang(buildStorageInputData());});}
hasInitializedInputListeners=true;}
async function calculatePaipan(){try{const data=collectData();const name=data.name;const birthday=data.birthday;const gender=data.gender;const identity=data.identity;const question=data.question;const time=data.time;return await liuren.paipan(name,birthday,gender,identity,question,time);}catch(error){messageModule.error({content:`排盘计算失败: ${error.message}`});return null;}}
function collectData(){const data={name:'',gender:'',birthday:'',identity:'',question:'',time:'',};const fields=['name','gender','birthday','identity','question','time','agent'];fields.forEach(field=>{const element=document.getElementById(field);if(element){if(field==='agent'){data.category=element.getAttribute('data-category');data.model=element.value;}else{data[field]=element.value;}}else{console.warn(`collectData: 字段 ${field} 未找到`);}});return data;}
function updateAllPanels(data){liurenBaseData=data;updateLiurenGz(data);updateLiurenGj(data);updateLiurenSc(data);updateLiurenSk(data);updateDizhiPan(data,'地盘对应天盘','tian-pan');updateDizhiPan(data,'地盘对应神盘','tian-jiang');updateDizhiPan(data,'地盘对应星盘','xing-pan');updateDizhiPan(data,'地盘对应天干','dungan');initAnimations();liurenLocalStorage.batchUpdateStorageData({baseGuaxiang:data,markdownGuaxiang:buildMarkdownGuaxiang(data),});}
function buildMarkdownGuaxiang(data){if(typeof liuren!=='undefined'&&typeof liuren.formatPaipanMarkdown==='function'){return liuren.formatPaipanMarkdown(data);}
return'';}
function updateLiurenGz(data){const gzTime=data['干支时间']||[];const elements=['year-gz','month-gz','day-gz','hour-gz'];elements.forEach((id,index)=>{const element=document.getElementById(id);if(element)element.textContent=gzTime[index]||'未知';});const xkongElement=document.getElementById('xkong');if(xkongElement)xkongElement.textContent=data['旬空']||'未知';}
function updateLiurenGj(data){const benMing=document.getElementById('ben-ming');const xingNian=document.getElementById('xing-nian');if(benMing)benMing.textContent=data['本命']||'未知';if(xingNian)xingNian.textContent=data['行年']||'未知';}
function updateLiurenSc(data){const sanchuan=data['三传']||{};const chuanConfig=[{prefix:'chuchuan',key:'初传'},{prefix:'zhongchuan',key:'中传'},{prefix:'mochuan',key:'末传'}];chuanConfig.forEach(({prefix,key})=>{const elements={main:document.getElementById(prefix),god:document.getElementById(`${prefix}-god`),liuqin:document.getElementById(`${prefix}-liuqin`),tiangan:document.getElementById(`${prefix}-tiangan`)};if(elements.main)elements.main.textContent=sanchuan[key]||'未知';if(elements.god)elements.god.textContent=sanchuan[`${key}十二神`]||'未知';if(elements.liuqin)elements.liuqin.textContent=sanchuan[`${key}六亲`]||'未知';if(elements.tiangan)elements.tiangan.textContent=sanchuan[`${key}遁干`]||'未知';});}
function updateLiurenSk(data){const sike=data['四课']||{};const keConfig=[{prefix:'yike',key:'一课'},{prefix:'erke',key:'二课'},{prefix:'sanke',key:'三课'},{prefix:'sike',key:'四课'}];keConfig.forEach(({prefix,key})=>{const keData=sike[key]||[];const elements={upper:document.getElementById(`${prefix}-upper`),lower:document.getElementById(`${prefix}-lower`),god:document.getElementById(`${prefix}-god`)};if(elements.upper)elements.upper.textContent=keData[1]||'未知';if(elements.lower)elements.lower.textContent=keData[0]||'未知';if(elements.god)elements.god.textContent=sike[`${key}神`]||'未知';});}
function updateDizhiPan(data,dataKey,elementPrefix){const panData=data[dataKey]||{};DIZHI_MAP.forEach((dizhi,index)=>{const element=document.getElementById(`${elementPrefix}-${DIZHI_PINYIN[index]}`);if(element){element.textContent=panData[dizhi]||'未知';}});}
function initAnimations(){const elements=document.querySelectorAll('.god, .upper, .lower, .liuqin, .dungan, .tian-pan, .tian-jiang, .xing-pan, .chuan');elements.forEach(element=>{element.classList.add('animate-in');element.addEventListener('animationend',()=>{element.classList.remove('animate-in');},{once:true});});}
async function restorePaipan(){try{const paipanData=await calculatePaipan();if(paipanData){updateAllPanels(paipanData);}else{console.warn('restorePaipan: 排盘数据为空');}}catch(error){console.error('restorePaipan: 恢复排盘数据失败',error);messageModule.error({content:`恢复排盘数据失败: ${error.message}`});}}
return{init:init,initInputsStorage:initInputsStorage,collectData:collectData,updateAllPanels:updateAllPanels,restorePaipan:restorePaipan,syncFormDataToStorage:syncFormDataToStorage,setRestoring:(state)=>{isRestoring=state;},};})();document.addEventListener('DOMContentLoaded',function(){document.addEventListener('infoInputModuleReady',async()=>{await liurenPaipan.init();},{once:true});});;(()=>{document.getElementById('help').addEventListener('click',showHelp);function showHelp(){messageModule.show({title:'如何填写信息',content:`
            <p><strong>姓名：</strong>真名假名均可。</p>
            <p><strong>性别：</strong>必须是占问人的真实性别。</p>
            <p><strong>出生日期：</strong>精确到日即可，需填写公历。</p>
            <p><strong>身份：</strong>即你的职业，可以是学生、生意人、打工人等，选填。</p>
            <p><strong>占问事项：</strong>简略的填写需要问的问题，无需描述过多的背景信息。</p>
            <p><strong>占问时间：</strong>即起卦的时间。</p>
            <p><strong>工作流模式：</strong></p>
                <p><strong>标准流式：</strong>即使用基本工作流进行解读，知识库+工作流+mcp服务，优势是速度快，劣势是由于工作流为线行运行，偶尔会出现幻觉。</p>
                <p><strong>集群解读（六壬待开发）：</strong>与最近爆火的open_claw（龙虾）架构类似，也称为蜂群模式，即多个智能体构成，线行与并行同时处理，自动调用不同的智能体处理不同的工作。准确度最高，能达到人工解读无法企及的全面性。劣势是速度很慢，一般需要10-20分钟左右。然后就是极其消耗token，与知识库、mcp服务等协同后，一次解读甚至能使用30+成本的token，建议重要问题再选择这个</p>
            <p><strong>解读风格：</strong></p>
                <p><strong>专业解析：</strong>保留了所有专业术语的解读报告，适合对大六壬了解的卦师，或者学习大六壬的人使用，能更深入的了解大六壬。</p>
                <p><strong>白话解读：</strong>去除了让普通人难以理解的专业术语，并转变为更易读懂的语言。</p>
            <blockquote>
            </blockquote>
            `,confirmText:'我明白了',isHtml:true});}})();;const liurenFetch=(()=>{'use strict';function normalizeTaskStatusResponse(data){if(!data||typeof data!=='object'){return data;}
const statusMap={PENDING:'pending',WAITING_RESOURCE:'waiting_resource',RUNNING:'processing',SUCCESS:'completed',FAILED:'failed',CANCELLED:'cancelled'};if(data.status&&statusMap[data.status]){data.status=statusMap[data.status];}
if(!data.result_analysis&&data['result_text']){data.result_analysis=data['result_text'];}
if(!data.reasoning_process&&data['reasoning_text']){data.reasoning_process=data['reasoning_text'];}
return data;}
function getInputValue(id){const element=document.getElementById(id);return element?element.value:'';}
function buildFeeConfirmMessage(data){const labelMap={vip_quota:'【本次使用 VIP 次数】',balance:'【本次扣除积分】',free:'【本次免费】'};const label=labelMap[data.payment_method]||'【费用确认】';return`${label}\n${data.message || '请确认是否继续解读'}`;}
function ensureGuaxiangPayload(liurenData){let baseGuaxiang=liurenData.baseGuaxiang;let markdownGuaxiang=liurenData.markdownGuaxiang;if(!baseGuaxiang&&typeof liurenPaipan!=='undefined'&&typeof liurenPaipan.collectData==='function'&&typeof liuren!=='undefined'&&typeof liuren.paipan==='function'){try{const formData=liurenPaipan.collectData();baseGuaxiang=liuren.paipan(formData.name,formData.birthday,formData.gender,formData.identity,formData.question,formData.time,);}catch(error){console.error('[六壬提交] 补算结构化卦象失败:',error);}}
if(!markdownGuaxiang&&baseGuaxiang&&typeof liuren!=='undefined'&&typeof liuren.formatPaipanMarkdown==='function'){try{markdownGuaxiang=liuren.formatPaipanMarkdown(baseGuaxiang);}catch(error){console.error('[六壬提交] 生成 Markdown 卦象失败:',error);}}
if(baseGuaxiang){liurenData.baseGuaxiang=baseGuaxiang;}
if(markdownGuaxiang){liurenData.markdownGuaxiang=markdownGuaxiang;}
if(baseGuaxiang||markdownGuaxiang){liurenLocalStorage.batchUpdateStorageData({baseGuaxiang:baseGuaxiang||liurenData.baseGuaxiang||'',markdownGuaxiang:markdownGuaxiang||liurenData.markdownGuaxiang||'',});}
return liurenData;}
function buildSubmitPayload(){if(typeof liurenPaipan!=='undefined'&&typeof liurenPaipan.syncFormDataToStorage==='function'){liurenPaipan.syncFormDataToStorage();}
let liurenData=liurenLocalStorage.getData();if(!liurenData||typeof liurenData!=='object'){liurenData={};}
liurenData.name=getInputValue('name');liurenData.gender=getInputValue('gender');liurenData.birthday=getInputValue('birthday');liurenData.identity=getInputValue('identity');liurenData.question=getInputValue('question');liurenData.time=getInputValue('time');const agentElement=document.getElementById('agent');if(agentElement){liurenData.agent=agentElement.value;liurenData.category=agentElement.getAttribute('data-category');}
liurenData.mode=getInputValue('mode')||liurenData.mode||liurenLocalStorage.DEFAULT_DATA.mode;liurenData=ensureGuaxiangPayload(liurenData);return liurenData;}
async function isLogin(){if(typeof window.isLogin==='function'){return await window.isLogin();}
try{const data=await liurenUtils.requestJson('/account/api/is_login/',{method:'GET',headers:{'X-Requested-With':'XMLHttpRequest','Content-Type':'application/json','X-CSRFToken':liurenUtils.getCookie('csrftoken')}});return data['is_login'];}catch(e){return false;}}
async function confirmJieguaFee(){return true;}
async function submitTask(){const liurenData=buildSubmitPayload();if(!liurenData.mode){liurenData.mode=liurenLocalStorage.DEFAULT_DATA.mode;}
if(!liurenData.agent){liurenData.agent=liurenLocalStorage.DEFAULT_DATA.agent;}
if(!liurenData.category){liurenData.category=liurenLocalStorage.DEFAULT_DATA.category;}
liurenData.biz_type='liuren';liurenData.created_at=new Date().toISOString();liurenLocalStorage.batchUpdateStorageData({created_at:liurenData.created_at,taskStartedAt:Date.now(),shareUrl:''});return liurenUtils.requestJson('/api/ai/tasks/',{method:'POST',headers:{'Content-Type':'application/json','X-CSRFToken':liurenUtils.getCookie('csrftoken')},body:JSON.stringify(liurenData)});}
async function fetchTaskStatus(taskId){const data=await liurenUtils.requestJson(`/api/ai/tasks/${taskId}/`,{method:'GET',headers:{'X-CSRFToken':liurenUtils.getCookie('csrftoken')}});return normalizeTaskStatusResponse(data);}
async function fetchLatestActiveTask(bizType='liuren'){const data=await liurenUtils.requestJson(`/api/ai/tasks/latest-active/?biz_type=${encodeURIComponent(bizType)}`,{method:'GET',headers:{'X-CSRFToken':liurenUtils.getCookie('csrftoken')}});if(data&&data.task){data.task=normalizeTaskStatusResponse(data.task);}
return data;}
async function cancelTask(taskId){return liurenUtils.requestJson(`/api/ai/tasks/${taskId}/cancel/`,{method:'POST',headers:{'X-CSRFToken':liurenUtils.getCookie('csrftoken')}});}
return{isLogin:isLogin,confirmJieguaFee:confirmJieguaFee,submitTask:submitTask,fetchTaskStatus:fetchTaskStatus,fetchLatestActiveTask:fetchLatestActiveTask,cancelTask:cancelTask,buildSubmitPayload:buildSubmitPayload}})();;(()=>{const qiguaBtn=document.getElementById('qigua');if(!qiguaBtn){return;}
qiguaBtn.addEventListener('click',huoshiQigua);function huoshiQigua(){const timeElement=document.getElementById('time');const now=new Date();const year=now.getFullYear();const month=String(now.getMonth()+1).padStart(2,'0');const day=String(now.getDate()).padStart(2,'0');const randomNumber=Math.floor(Math.random()*1000)+1;const remainder=randomNumber%12;const hour=remainder===0?23:remainder-1;const hours=String(hour).padStart(2,'0');const minutes=String(Math.floor(Math.random()*60)).padStart(2,'0');const seconds=String(Math.floor(Math.random()*60)).padStart(2,'0');const formattedTime=`${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;if(timeElement){timeElement.value=formattedTime;timeElement.setAttribute('value',formattedTime);timeElement.dispatchEvent(new Event('change',{bubbles:true}));}}
return{}})();;(()=>{'use strict';const resetBtn=document.getElementById('reset');const initialAgentPanelHtml=document.getElementById('agent-panel')?.innerHTML||'';if(resetBtn){resetBtn.addEventListener('click',resetAll);}
async function resetAll(){if(await messageModule.confirm({content:'是否要重置所有内容？'})){const taskId=liurenLocalStorage.getKeyData('taskId');if(taskId){try{await fetch(`/api/ai/tasks/${taskId}/cancel`,{method:'POST'});}catch(e){}}
initUrl();liurenJieguaAsync?.resetRuntime?.();liurenLocalStorage.clearStorage();liurenLocalStorage.initStorage();await inputModule.init();['name','gender','birthday','identity','question'].forEach(function(id){const el=document.getElementById(id);if(!el)return;el.value='';el.setAttribute('value','');});initChatDisplay();initBtns();await liurenPaipan.init();resetAppraiseState();resetAgentPanel();await liurenPaipan.initInputsStorage();liurenUI.updateTips(liurenUtils.DEFAULT_TIPS_TEXT,false);messageModule.info({content:'重置成功！'});}}
function initUrl(){if(window.location.search.includes('temp_id=')){const url=new URL(window.location);url.searchParams.delete('temp_id');window.history.replaceState({},document.title,url.toString());}}
function initChatDisplay(){const liurenResultElement=document.getElementById('result');const liurenCaseShareElement=document.getElementById('share-case-url');if(liurenResultElement){liurenResultElement.innerHTML='';}
if(liurenCaseShareElement){liurenCaseShareElement.innerHTML='';}
disableAppraisePanel();disableSharePanel();}
function resetAgentPanel(){if(window.liurenUI&&typeof liurenUI.resetAgentPanel==='function'){liurenUI.resetAgentPanel();return;}
const agentPanel=document.getElementById('agent-panel');if(agentPanel){agentPanel.innerHTML=initialAgentPanelHtml;agentPanel.classList.remove('active');}}
function resetAppraiseState(){if(window.appraiseModule&&typeof window.appraiseModule.resetAppraisePanel==='function'){window.appraiseModule.resetAppraisePanel();}}
function disableAppraisePanel(){const appraisePanel=document.getElementById('appraise-panel');if(appraisePanel){appraisePanel.classList.remove('active');}}
function disableSharePanel(){if(window.liurenUI&&typeof liurenUI.hideSharePanel==='function'){liurenUI.hideSharePanel();}}
function clearQuestionInput(){const questionElement=document.getElementById('question');if(questionElement){questionElement.value='';questionElement.setAttribute('value','');}}
function initBtns(){liurenUI.setBtnState('enable');liurenUI.resetResultActions();}})();;let debatePanelRenderer=(()=>{'use strict';function createDebateHeader(roundName){const header=document.createElement('div');header.className='debate-round-header';header.innerHTML=`<h3>${roundName}</h3><span class="debate-start-tag">开始辩论</span>`;return header;}
function createDebateBubble(roleConfig){const bubble=document.createElement('div');bubble.className=`debate-bubble ${roleConfig.class}`;bubble.innerHTML=`
            <div class="debate-bubble-header">
                <span class="debate-role-tag">${roleConfig.name}</span>
            </div>
            <div class="debate-bubble-content"></div>
        `;return bubble;}
function createInfoBubble(title,bubbleClass){const bubble=document.createElement('div');bubble.className=`debate-bubble ${bubbleClass}`;bubble.innerHTML=`
            <div class="debate-bubble-header">
                <span class="debate-role-tag">${title}</span>
            </div>
            <div class="debate-bubble-content"></div>
        `;return bubble;}
function createReasoningOnlyBubble(title){const bubble=document.createElement('div');bubble.className='debate-bubble debate-bubble-default';bubble.innerHTML=`
            <div class="reasoning-collapsible collapsed">
                <div class="reasoning-header">
                    <span class="reasoning-toggle-icon">
                        <svg viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"/></svg>
                    </span>
                    <span>${title}</span>
                </div>
                <div class="reasoning-content-wrapper">
                    <div class="reasoning-content"></div>
                </div>
            </div>
        `;return bubble;}
function createDebateBubbleWithReasoning(roleConfig){const bubble=document.createElement('div');bubble.className=`debate-bubble ${roleConfig.class}`;bubble.innerHTML=`
            <div class="debate-bubble-header">
                <span class="debate-role-tag">${roleConfig.name}</span>
            </div>
            <div class="reasoning-collapsible">
                <div class="reasoning-header">
                    <span class="reasoning-toggle-icon">
                        <svg viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"/></svg>
                    </span>
                    <span>💭 思考过程</span>
                    <span class="reasoning-thinking-indicator">
                        <span class="reasoning-thinking-dots">
                            <span></span><span></span><span></span>
                        </span>
                    </span>
                </div>
                <div class="reasoning-content-wrapper">
                    <div class="reasoning-content"></div>
                </div>
            </div>
            <div class="debate-bubble-content"></div>
        `;return bubble;}
function toggleReasoningPanel(collapsibleElement){if(collapsibleElement){collapsibleElement.classList.toggle('collapsed');}}
function bindReasoningToggle(rootElement){if(!rootElement){return;}
const panels=rootElement.matches?.('.reasoning-collapsible')?[rootElement]:Array.from(rootElement.querySelectorAll?.('.reasoning-collapsible')||[]);panels.forEach(panel=>{const header=panel.querySelector('.reasoning-header');if(!header){return;}
header.onclick=function(){toggleReasoningPanel(panel);};});}
function activateDebateTab(index){const tab=document.getElementById(`tab-round-${index}`);const content=document.getElementById(`debate-round-${index}`);if(tab){tab.style.display='';}
if(content){content.style.display='';}
if(tab&&!tab.classList.contains('active')){tab.classList.add('active-round');}}
function markTabCompleted(tabIndex){const tab=document.getElementById(`tab-round-${tabIndex}`);const content=document.getElementById(`debate-round-${tabIndex}`);if(tab){tab.style.display='';}
if(content){content.style.display='';}
if(tab){tab.classList.add('completed');tab.classList.remove('active-round');}}
function completeReasoning(bubbleContainer){const bubble=bubbleContainer?.closest('.debate-bubble');if(!bubble){return;}
const indicator=bubble.querySelector('.reasoning-thinking-indicator');if(indicator){indicator.style.display='none';}}
function appendToContainer(containerId,element,helpers={}){const container=document.getElementById(containerId);if(!container){return;}
container.appendChild(element);bindReasoningToggle(element);if(typeof helpers.initSmartScroll==='function'){helpers.initSmartScroll(containerId);}
if(typeof helpers.smartScrollToBottom==='function'){helpers.smartScrollToBottom(container);}}
function appendTextToElement(element,text,speakerKey,bubbleContents,smartScrollToBottom,options){if(!element){return;}
const renderOptions=options||{};const scopeId=renderOptions.scopeId||speakerKey;if(!bubbleContents[speakerKey]){bubbleContents[speakerKey]='';}
bubbleContents[speakerKey]+=text;if(scopeId&&typeof streamRenderer!=='undefined'&&typeof streamRenderer.renderElement==='function'){streamRenderer.renderElement(scopeId,element,text,{attemptId:renderOptions.attemptId,onAfterRender:function(){const container=element.closest('.debate-tab-content');if(container&&typeof smartScrollToBottom==='function'){smartScrollToBottom(container);}}});}else{element.innerHTML=parseMarkdownSafe(bubbleContents[speakerKey]);}
const container=element.closest('.debate-tab-content');if(container&&typeof smartScrollToBottom==='function'){smartScrollToBottom(container);}}
function escapeHtml(text){if(!text)return'';const div=document.createElement('div');div.textContent=text;return div.innerHTML;}
function parseMarkdownSafe(text){if(!text)return'';if(typeof liurenUtils!=='undefined'&&typeof liurenUtils.renderMarkdownSafe==='function'){return liurenUtils.renderMarkdownSafe(text);}
if(typeof marked!=='undefined'&&marked.parse){try{return marked.parse(escapeHtml(text),{breaks:true,gfm:true});}catch(error){console.warn('marked.parse 解析失败，回退到简单处理:',error);}}
return escapeHtml(text).replace(/\n/g,'<br>');}
return{createDebateHeader,createDebateBubble,createInfoBubble,createReasoningOnlyBubble,createDebateBubbleWithReasoning,toggleReasoningPanel,bindReasoningToggle,activateDebateTab,markTabCompleted,completeReasoning,appendToContainer,appendTextToElement,escapeHtml,parseMarkdownSafe,};})();window.debatePanelRenderer=debatePanelRenderer;;let debateJudgeHandler=(()=>{'use strict';function createState(){return{decisionParserMap:{},decisionBubbleMap:{},finalBubbleMap:{},finalContentMap:{},finalSourceMap:{}};}
function createIncrementalJSONParser(){const instance={buffer:'',extractedFields:{}};function unescapeJSON(text){return text.replace(/\\n/g,'\n').replace(/\\t/g,'\t').replace(/\\r/g,'\r').replace(/\\"/g,'"').replace(/\\\\/g,'\\');}
function matchStringField(fieldName){const partialPattern=new RegExp(`"${fieldName}"\\s*:\\s*"([\\s\\S]*?)(?:"\\s*[,}]|"\\s*$|$)`);const fullPattern=new RegExp(`"${fieldName}"\\s*:\\s*"((?:[^"\\\\]|\\\\.)*)"`);const partialMatch=instance.buffer.match(partialPattern);const fullMatch=instance.buffer.match(fullPattern);if(fullMatch){return{value:unescapeJSON(fullMatch[1]),complete:true};}
if(partialMatch){return{value:unescapeJSON(partialMatch[1]),complete:false};}
return null;}
function extractAvailableFields(){const result=Object.assign({},instance.extractedFields);if(!result.status){const statusMatch=instance.buffer.match(/"status"\s*:\s*"(resolved|debating)"/);if(statusMatch){result.status=statusMatch[1];}}
const reasonField=matchStringField('reason');if(reasonField){result.reason=reasonField.value;result.reasonComplete=reasonField.complete;}
const instructionField=matchStringField('next_instruction');if(instructionField){result.next_instruction=instructionField.value;result.instructionComplete=instructionField.complete;}
const finalField=matchStringField('final_content');if(finalField){result.final_content=finalField.value;result.finalContentComplete=finalField.complete;}
result.isComplete=instance.buffer.trim().endsWith('}');instance.extractedFields=result;return result;}
instance.append=function(chunk){instance.buffer+=chunk;return extractAvailableFields();};instance.reset=function(){instance.buffer='';instance.extractedFields={};};instance.getExtractedFields=function(){return Object.assign({},instance.extractedFields);};return instance;}
function createJudgeStreamBubblePlaceholder(){const bubble=document.createElement('div');bubble.className='debate-bubble debate-bubble-judge judge-streaming';bubble.innerHTML=`
            <div class="debate-bubble-header">
                <span class="debate-role-tag">裁判</span>
                <span class="judge-status judge-status-loading">
                    <span class="judge-loading-indicator"></span>
                    <span class="judge-loading-text">正在分析...</span>
                </span>
            </div>
            <div class="debate-bubble-content judge-streaming-body">
                <div class="judge-streaming-reason"></div>
                <div class="judge-streaming-next-instruction" style="display:none;"></div>
            </div>
        `;return bubble;}
function updateJudgeStatus(bubble,status){const statusEl=bubble?.querySelector('.judge-status');if(!statusEl){return;}
if(status==='loading'){statusEl.className='judge-status judge-status-loading';statusEl.innerHTML=`
                <span class="judge-loading-indicator"></span>
                <span class="judge-loading-text">正在分析...</span>
            `;return;}
const statusText=status==='debating'?'继续讨论':'达成裁决';const statusIcon=status==='debating'?'🔄':'✅';statusEl.className=`judge-status ${status === 'debating' ? 'judge-status-debating' : 'judge-status-consensus'}`;statusEl.innerHTML=`${statusIcon} ${statusText}`;}
function ensureJudgeFinalBubble(targetId,speakerKey,source,context){const{state,renderer,appendHelpers,updateTips}=context;const sourceChanged=state.finalSourceMap[speakerKey]&&state.finalSourceMap[speakerKey]!==source;if(sourceChanged){state.finalContentMap[speakerKey]='';}
if(!state.finalBubbleMap[speakerKey]){const bubble=document.createElement('div');bubble.className='debate-bubble debate-bubble-judge-final judge-final-streaming';bubble.innerHTML=`
                <div class="debate-bubble-header">
                    <span class="debate-role-tag">裁判结论</span>
                    <span class="judge-status judge-status-final">
                        <span class="judge-loading-indicator"></span>
                        <span class="judge-loading-text">正在生成...</span>
                    </span>
                </div>
                <div class="debate-bubble-content final-content"></div>
            `;renderer.appendToContainer(targetId,bubble,appendHelpers);state.finalBubbleMap[speakerKey]=bubble;state.finalContentMap[speakerKey]='';updateTips('正在生成裁判结论...点此查看详情');}else if(sourceChanged){const bubble=state.finalBubbleMap[speakerKey];const contentEl=bubble.querySelector('.final-content');const statusEl=bubble.querySelector('.judge-status');if(contentEl){contentEl.innerHTML='';}
bubble.classList.add('judge-final-streaming');if(statusEl){statusEl.innerHTML=`
                    <span class="judge-loading-indicator"></span>
                    <span class="judge-loading-text">正在生成...</span>
                `;}}
state.finalSourceMap[speakerKey]=source;}
function renderJudgeFinalContent(speakerKey,content,context){const{state,renderer}=context;const bubble=state.finalBubbleMap[speakerKey];const contentEl=bubble?.querySelector('.final-content');if(contentEl){contentEl.innerHTML=renderer.parseMarkdownSafe(content);}}
function finalizeJudgeFinalBubble(speakerKey,context){const{state}=context;const bubble=state.finalBubbleMap[speakerKey];const statusEl=bubble?.querySelector('.judge-status');if(!bubble){return;}
bubble.classList.remove('judge-final-streaming');if(statusEl){statusEl.innerHTML='✅ 已完成';}}
function updateJudgeStreamBubbleContent(bubble,extracted,context,speakerKey){const{renderer,state}=context;if(!bubble||!extracted){return;}
if(extracted.status){updateJudgeStatus(bubble,extracted.status);}
const reasonEl=bubble.querySelector('.judge-streaming-reason');if(extracted.reason&&reasonEl){reasonEl.innerHTML=renderer.parseMarkdownSafe(extracted.reason);}
const instructionEl=bubble.querySelector('.judge-streaming-next-instruction');if(extracted.next_instruction&&instructionEl){instructionEl.style.display='block';instructionEl.innerHTML=`<strong>后续指引：</strong><div>${renderer.parseMarkdownSafe(extracted.next_instruction)}</div>`;}
if(!extracted.final_content||state.finalSourceMap[speakerKey]==='stream'){return;}
const targetId=bubble.closest('.debate-tab-content')?.id;if(!targetId){return;}
ensureJudgeFinalBubble(targetId,speakerKey,'json',context);state.finalContentMap[speakerKey]=extracted.final_content;renderJudgeFinalContent(speakerKey,state.finalContentMap[speakerKey],context);if(extracted.finalContentComplete){finalizeJudgeFinalBubble(speakerKey,context);}}
function handleJudgeDecisionStreamMessage(data,context){const chunk=context.normalizeChunk(data);const roundId=chunk.round;const content=chunk.content||'';const tabIndex=context.extractTabIndex(roundId);const targetId=`debate-round-${tabIndex}`;const speakerKey=`round_${tabIndex}`;const{state,renderer,appendHelpers,smartScrollToBottom,updateTips}=context;if(!state.decisionParserMap[speakerKey]){state.decisionParserMap[speakerKey]=createIncrementalJSONParser();context.completeReasoningFor(speakerKey);context.roundSpeakerMap[speakerKey]='judge';const bubble=createJudgeStreamBubblePlaceholder();renderer.appendToContainer(targetId,bubble,appendHelpers);state.decisionBubbleMap[speakerKey]=bubble;updateTips('裁判正在分析...点此查看详情');}
const extracted=state.decisionParserMap[speakerKey].append(content);updateJudgeStreamBubbleContent(state.decisionBubbleMap[speakerKey],extracted,context,speakerKey);const container=document.getElementById(targetId);if(container){smartScrollToBottom(container);}}
function resetScope(scopeId,context){if(!scopeId||!context){return;}
const match=scopeId.match(/^(round_\d+):judge:(judge_decision|final|answer)$/);if(!match){return;}
const roundId=match[1];const channel=match[2];const speakerKey=`round_${context.extractTabIndex(roundId)}`;const{state}=context;if(channel==='judge_decision'||channel==='answer'){if(state.decisionParserMap[speakerKey]?.reset){state.decisionParserMap[speakerKey].reset();}
const bubble=state.decisionBubbleMap[speakerKey];if(bubble){const reasonEl=bubble.querySelector('.judge-streaming-reason');const instructionEl=bubble.querySelector('.judge-streaming-next-instruction');if(reasonEl){reasonEl.innerHTML='';}
if(instructionEl){instructionEl.innerHTML='';instructionEl.style.display='none';}
bubble.classList.add('judge-streaming');updateJudgeStatus(bubble,'loading');}
return;}
if(channel==='final'){state.finalContentMap[speakerKey]='';const bubble=state.finalBubbleMap[speakerKey];const contentEl=bubble?.querySelector('.final-content');if(contentEl){contentEl.innerHTML='';}}}
function handleJudgeDecisionCompleteMessage(data,context){const chunk=context.normalizeChunk(data);const tabIndex=context.extractTabIndex(chunk.round);const speakerKey=`round_${tabIndex}`;const{state,updateTips}=context;const parser=state.decisionParserMap[speakerKey];const extracted=parser?parser.getExtractedFields():{};if(state.decisionBubbleMap[speakerKey]){state.decisionBubbleMap[speakerKey].classList.remove('judge-streaming');updateJudgeStatus(state.decisionBubbleMap[speakerKey],extracted.status||'resolved');}
if(parser){parser.reset();delete state.decisionParserMap[speakerKey];}
const statusText=extracted.status==='debating'?'继续讨论':'裁决完成';updateTips(`裁判决定: ${statusText}，点此查看详情`);}
function handleJudgeDecisionMessage(data,context){const chunk=context.normalizeChunk(data);const status=chunk.status||'';if(status==='debating'){context.updateTips('裁判认为仍需继续讨论，点此查看详情');return;}
if(status==='resolved'){context.updateTips('裁判已做出决定，正在生成结论...点此查看详情');}}
function handleJudgeFinalStreamMessage(data,context){const chunk=context.normalizeChunk(data);const roundId=chunk.round;const content=chunk.content||'';const tabIndex=context.extractTabIndex(roundId);const targetId=`debate-round-${tabIndex}`;const speakerKey=`round_${tabIndex}`;const{state,smartScrollToBottom}=context;const scopeId=chunk.scope_id||`${roundId}:judge:final`;ensureJudgeFinalBubble(targetId,speakerKey,'stream',context);state.finalContentMap[speakerKey]+=content;if(typeof streamRenderer!=='undefined'&&typeof streamRenderer.renderElement==='function'){const contentEl=state.finalBubbleMap[speakerKey]?.querySelector('.final-content');streamRenderer.renderElement(scopeId,contentEl,content,{attemptId:chunk.attempt_id,onAfterRender:function(){const container=document.getElementById(targetId);if(container){smartScrollToBottom(container);}}});}else{renderJudgeFinalContent(speakerKey,state.finalContentMap[speakerKey],context);}
const container=document.getElementById(targetId);if(container){smartScrollToBottom(container);}}
function handleJudgeFinalCompleteMessage(data,context){const chunk=context.normalizeChunk(data);const roundId=chunk.round;const content=chunk.content||'';const tabIndex=context.extractTabIndex(roundId);const targetId=`debate-round-${tabIndex}`;const speakerKey=`round_${tabIndex}`;const{state}=context;if(content&&!state.finalContentMap[speakerKey]){ensureJudgeFinalBubble(targetId,speakerKey,'stream',context);state.finalContentMap[speakerKey]=content;renderJudgeFinalContent(speakerKey,state.finalContentMap[speakerKey],context);}
if(state.finalBubbleMap[speakerKey]){finalizeJudgeFinalBubble(speakerKey,context);}
context.updateTips('裁判结论已生成，点此查看详情');context.markTabCompleted(tabIndex);}
function clearRoundState(state,speakerKey){if(state.decisionParserMap[speakerKey]?.reset){state.decisionParserMap[speakerKey].reset();}
delete state.decisionParserMap[speakerKey];delete state.decisionBubbleMap[speakerKey];delete state.finalBubbleMap[speakerKey];delete state.finalContentMap[speakerKey];delete state.finalSourceMap[speakerKey];}
function resetState(state){Object.keys(state.decisionParserMap).forEach(function(speakerKey){if(state.decisionParserMap[speakerKey]?.reset){state.decisionParserMap[speakerKey].reset();}});state.decisionParserMap={};state.decisionBubbleMap={};state.finalBubbleMap={};state.finalContentMap={};state.finalSourceMap={};}
return{createState,createIncrementalJSONParser,handleJudgeDecisionStreamMessage,handleJudgeDecisionCompleteMessage,handleJudgeDecisionMessage,handleJudgeFinalStreamMessage,handleJudgeFinalCompleteMessage,resetScope,clearRoundState,resetState};})();window.debateJudgeHandler=debateJudgeHandler;;let debateMessageHandler=(()=>{'use strict';const renderer=window.debatePanelRenderer;const judgeHandler=window.debateJudgeHandler;const CONFIG={ROUND_NAMES:{round_1:'用神取用',round_2:'四课分析',round_3:'三传分析',round_4:'天将神煞',round_5:'年命交互',round_6:'现实对轨',round_7:'应期推断'},ROLES:{pro:{name:'正方',class:'debate-bubble-pro'},con:{name:'反方',class:'debate-bubble-con'},judge:{name:'裁判',class:'debate-bubble-judge'}}};let roundSpeakerMap={};let messageContentElementMap={};let messageContentTextMap={};let messageReasoningTextMap={};let scopeAttemptMap={};let judgeRuntimeState=judgeHandler.createState();let mcpSystemElementMap={};let mcpAgentOutputElementMap={};let mcpAgentReasoningElementMap={};let autoScrollEnabled=true;let scrollTimer=null;let scrollBoundContainerSet=new WeakSet();let topicMapSyncTimer=null;let lastTopicMapSnapshot='';let pendingTopicMapSeq=0;window.addEventListener('pagehide',flushTopicMapSync);function handleProtocolMessage(data){const handlers={debate_start:handleDebateStartMessage,stream_reset:handleStreamResetMessage,debate_reasoning:handleDebateReasoningMessage,debate:handleDebateMessage,judge_decision_stream:function(message){judgeHandler.handleJudgeDecisionStreamMessage(message,createJudgeContext());},judge_decision_complete:function(message){judgeHandler.handleJudgeDecisionCompleteMessage(message,createJudgeContext());},judge_decision:function(message){judgeHandler.handleJudgeDecisionMessage(message,createJudgeContext());},judge_final_stream:function(message){judgeHandler.handleJudgeFinalStreamMessage(message,createJudgeContext());},judge_final_complete:function(message){judgeHandler.handleJudgeFinalCompleteMessage(message,createJudgeContext());},round_complete:handleRoundCompleteMessage,exchange_continue:handleExchangeContinueMessage,consensus_reached:handleConsensusReachedMessage,anchor_complete:handleAnchorCompleteMessage,analysis_complete:handleAnalysisCompleteMessage,stage_transition:handleStageTransitionMessage,mcp_system:handleMcpSystemMessage,mcp_agent_output:handleMcpAgentOutputMessage,mcp_agent_reasoning:handleMcpAgentReasoningMessage};const handler=handlers[data.type];if(!handler){return false;}
handler(data);scheduleTopicMapSync(data['seq']);return true;}
function createJudgeContext(){return{state:judgeRuntimeState,renderer,appendHelpers:{initSmartScroll,smartScrollToBottom},smartScrollToBottom,updateTips,normalizeChunk,extractTabIndex,completeReasoningFor,markTabCompleted:renderer.markTabCompleted,roundSpeakerMap};}
function handleDebateStartMessage(data){const chunk=normalizeChunk(data);const tabIndex=extractTabIndex(chunk.round);const roundName=chunk.name||CONFIG.ROUND_NAMES[`round_${tabIndex}`]||`第${tabIndex}轮`;const targetId=`debate-round-${tabIndex}`;const speakerKey=`round_${tabIndex}`;clearRound(tabIndex);renderer.activateDebateTab(tabIndex);roundSpeakerMap[speakerKey]=null;messageContentElementMap[speakerKey]=null;messageContentTextMap[speakerKey]='';messageReasoningTextMap[speakerKey]='';renderer.appendToContainer(targetId,renderer.createDebateHeader(roundName),{initSmartScroll,smartScrollToBottom});updateTips(`[${roundName}] 正在辩论...点此查看详情`);}
function handleDebateReasoningMessage(data){const chunk=normalizeChunk(data);if(!acceptAttempt(chunk)){return;}
const tabIndex=extractTabIndex(chunk.round);const speakerKey=`round_${tabIndex}`;const targetId=`debate-round-${tabIndex}`;const role=chunk.role;const content=chunk.content||'';const roleConfig=getRoleConfig(role);const scopeId=chunk.scope_id||`${speakerKey}_${role}_reasoning`;ensureDebateBubbleForRole(speakerKey,targetId,role,roleConfig,true);messageReasoningTextMap[scopeId]=`${messageReasoningTextMap[scopeId] || ''}${content}`;const bubble=messageContentElementMap[speakerKey]?.closest('.debate-bubble');const reasoningContent=bubble?.querySelector('.reasoning-content');if(reasoningContent){if(typeof streamRenderer!=='undefined'&&typeof streamRenderer.renderElement==='function'){streamRenderer.renderElement(scopeId,reasoningContent,content,{attemptId:chunk.attempt_id,onAfterRender:function(){const container=reasoningContent.closest('.debate-tab-content');if(container){smartScrollToBottom(container);}}});}else{reasoningContent.innerHTML=renderer.parseMarkdownSafe(messageReasoningTextMap[scopeId]);}}}
function handleDebateMessage(data){const chunk=normalizeChunk(data);if(!acceptAttempt(chunk)){return;}
const tabIndex=extractTabIndex(chunk.round);const speakerKey=`round_${tabIndex}`;const targetId=`debate-round-${tabIndex}`;const role=chunk.role;const content=chunk.content||'';const roleConfig=getRoleConfig(role);const scopeId=chunk.scope_id||`${speakerKey}_${role}_answer`;ensureDebateBubbleForRole(speakerKey,targetId,role,roleConfig,false);if(hasReasoningForSpeaker(speakerKey)){completeReasoningFor(speakerKey);}
renderer.appendTextToElement(messageContentElementMap[speakerKey],content,scopeId,messageContentTextMap,smartScrollToBottom,{scopeId,attemptId:chunk.attempt_id});}
function handleStreamResetMessage(data){const chunk=normalizeChunk(data);const scopeId=chunk.scope_id;if(!scopeId||!acceptAttempt(chunk,true)){return;}
if(typeof streamRenderer!=='undefined'&&typeof streamRenderer.resetScope==='function'){streamRenderer.resetScope(scopeId,chunk.attempt_id);}
messageContentTextMap[scopeId]='';messageReasoningTextMap[scopeId]='';if(scopeId.indexOf(':judge:judge_decision')!==-1||scopeId.indexOf(':judge:answer')!==-1){judgeHandler.resetScope(scopeId,createJudgeContext());}
if(scopeId.indexOf(':judge:final')!==-1){judgeHandler.resetScope(scopeId,createJudgeContext());}
updateTips('智能体连接中断，正在切换线路重新生成当前内容...点此查看详情');}
function ensureDebateBubbleForRole(speakerKey,targetId,role,roleConfig,withReasoning){if(roundSpeakerMap[speakerKey]===role&&messageContentElementMap[speakerKey]){return;}
completeReasoningFor(speakerKey);roundSpeakerMap[speakerKey]=role;messageContentTextMap[speakerKey]='';if(withReasoning){messageReasoningTextMap[speakerKey]='';}
const bubble=withReasoning?renderer.createDebateBubbleWithReasoning(roleConfig):renderer.createDebateBubble(roleConfig);renderer.appendToContainer(targetId,bubble,{initSmartScroll,smartScrollToBottom});messageContentElementMap[speakerKey]=bubble.querySelector('.debate-bubble-content');}
function handleRoundCompleteMessage(data){const chunk=normalizeChunk(data);const tabIndex=extractTabIndex(chunk.round);const speakerKey=`round_${tabIndex}`;completeReasoningFor(speakerKey);renderer.markTabCompleted(tabIndex);}
function handleExchangeContinueMessage(data){const chunk=normalizeChunk(data);const tabIndex=extractTabIndex(chunk.round);const speakerKey=`round_${tabIndex}`;completeReasoningFor(speakerKey);roundSpeakerMap[speakerKey]=null;messageContentElementMap[speakerKey]=null;}
function handleConsensusReachedMessage(data){const chunk=normalizeChunk(data);const speakerKey=`round_${extractTabIndex(chunk.round)}`;completeReasoningFor(speakerKey);}
function handleAnchorCompleteMessage(data){const chunk=normalizeChunk(data);updateTips(`锚定完成: ${chunk['anchor_type'] || ''}，点此查看详情`);}
function handleAnalysisCompleteMessage(data){const chunk=normalizeChunk(data);updateTips(`分析完成: ${chunk['analysis_type'] || ''}，点此查看详情`);}
function handleStageTransitionMessage(data){const chunk=normalizeChunk(data);updateTips(`进入 Stage ${chunk['to_stage'] || ''}...点此查看详情`);}
function handleMcpSystemMessage(data){handleInfoPanelMessage({targetId:'debate-round-7',speakerKey:'round_7_mcp_system',title:'MCP系统',bubbleClass:'debate-bubble-default',content:data.content||'',bubbleStore:mcpSystemElementMap,querySelector:'.debate-bubble-content'});}
function handleMcpAgentOutputMessage(data){handleInfoPanelMessage({targetId:'debate-round-7',speakerKey:'round_7_mcp_output',title:'MCP智能体',bubbleClass:'debate-bubble-pro',content:data.content||'',bubbleStore:mcpAgentOutputElementMap,querySelector:'.debate-bubble-content'});}
function handleMcpAgentReasoningMessage(data){handleInfoPanelMessage({targetId:'debate-round-7',speakerKey:'round_7_mcp_reasoning',title:'MCP智能体思考',content:data.content||'',bubbleStore:mcpAgentReasoningElementMap,querySelector:'.reasoning-content',bubbleFactory:function(){return renderer.createReasoningOnlyBubble('MCP智能体思考');}});}
function handleInfoPanelMessage(options){const{targetId,speakerKey,title,bubbleClass,content,bubbleStore,querySelector,bubbleFactory}=options;if(!content){return;}
if(!bubbleStore[speakerKey]){const bubble=bubbleFactory?bubbleFactory():renderer.createInfoBubble(title,bubbleClass);renderer.appendToContainer(targetId,bubble,{initSmartScroll,smartScrollToBottom});bubbleStore[speakerKey]=bubble.querySelector(querySelector);}
renderer.appendTextToElement(bubbleStore[speakerKey],content,speakerKey,messageContentTextMap,smartScrollToBottom);const container=document.getElementById(targetId);if(container){smartScrollToBottom(container);}}
function getRoleConfig(role){return CONFIG.ROLES[role]||{name:role,class:'debate-bubble-default'};}
function completeReasoningFor(speakerKey){renderer.completeReasoning(messageContentElementMap[speakerKey]);}
function acceptAttempt(chunk,isReset){const scopeId=chunk.scope_id;const attemptId=Number(chunk.attempt_id||0);if(!scopeId||!attemptId){return true;}
const currentAttempt=Number(scopeAttemptMap[scopeId]||0);if(currentAttempt&&attemptId<currentAttempt){return false;}
if(isReset||attemptId>currentAttempt){scopeAttemptMap[scopeId]=attemptId;}
return true;}
function hasReasoningForSpeaker(speakerKey){if(messageReasoningTextMap[speakerKey]){return true;}
const prefix=`round_${speakerKey.replace('round_', '')}:`;return Object.keys(messageReasoningTextMap).some(function(key){return key.indexOf(prefix)===0&&messageReasoningTextMap[key];});}
function initSmartScroll(containerId){const container=document.getElementById(containerId);if(!container||scrollBoundContainerSet.has(container)){return;}
scrollBoundContainerSet.add(container);container.addEventListener('wheel',handleUserScroll,{passive:true});container.addEventListener('touchmove',handleUserScroll,{passive:true});container.addEventListener('scroll',handleUserScroll,{passive:true});}
function handleUserScroll(){autoScrollEnabled=false;if(scrollTimer){clearTimeout(scrollTimer);}
scrollTimer=setTimeout(function(){autoScrollEnabled=true;},3000);}
function smartScrollToBottom(container){if(!container||!autoScrollEnabled){return;}
container.scrollTo({top:container.scrollHeight,behavior:'smooth'});}
function destroySmartScroll(containerId){const container=document.getElementById(containerId);if(!container){return;}
scrollBoundContainerSet.delete(container);container.removeEventListener('wheel',handleUserScroll);container.removeEventListener('touchmove',handleUserScroll);container.removeEventListener('scroll',handleUserScroll);}
function scheduleTopicMapSync(seq){const nextSeq=Number(seq||0);if(nextSeq>pendingTopicMapSeq){pendingTopicMapSeq=nextSeq;}
if(topicMapSyncTimer){clearTimeout(topicMapSyncTimer);}
topicMapSyncTimer=setTimeout(function(){flushTopicMapSync();},600);}
function flushTopicMapSync(){if(topicMapSyncTimer){clearTimeout(topicMapSyncTimer);topicMapSyncTimer=null;}
const agentPanel=document.getElementById('agent-panel');if(!agentPanel||typeof liurenLocalStorage==='undefined'||!window.liurenCasePanel){return;}
const nextTopicMap=window.liurenCasePanel.captureTopicMap(agentPanel);const nextSnapshot=JSON.stringify(nextTopicMap);const storedSeq=Number(liurenLocalStorage.getKeyData('lastStreamSeq')||0);const nextSeq=pendingTopicMapSeq>0?pendingTopicMapSeq:storedSeq;if(nextSnapshot===lastTopicMapSnapshot&&nextSeq<=storedSeq){return;}
lastTopicMapSnapshot=nextSnapshot;pendingTopicMapSeq=0;liurenLocalStorage.batchUpdateStorageData({topicMap:nextTopicMap,lastStreamSeq:nextSeq,});}
function normalizeChunk(data){if(data.content&&typeof data.content==='object'){return data.content;}
return data;}
function hydrateInfoBubbleFromDom(bubble,speakerKey,querySelector,bubbleStore){const target=bubble.querySelector(querySelector);if(!target){return;}
bubbleStore[speakerKey]=target;messageContentTextMap[speakerKey]=target.textContent||'';}
function hydrateRoundFromDom(tabIndex){const containerId=`debate-round-${tabIndex}`;const container=document.getElementById(containerId);const speakerKey=`round_${tabIndex}`;if(!container){return;}
initSmartScroll(containerId);let activeDebateRole=null;let activeDebateContentEl=null;let activeDebateContentText='';let activeDebateReasoningText='';Array.from(container.querySelectorAll('.debate-bubble')).forEach(function(bubble){const roleTag=(bubble.querySelector('.debate-role-tag')?.textContent||'').trim();if(bubble.classList.contains('debate-bubble-judge-final')){judgeRuntimeState.finalBubbleMap[speakerKey]=bubble;judgeRuntimeState.finalContentMap[speakerKey]=bubble.querySelector('.final-content')?.textContent||'';judgeRuntimeState.finalSourceMap[speakerKey]=bubble.classList.contains('judge-final-streaming')?'stream':'dom';activeDebateRole=null;activeDebateContentEl=null;activeDebateContentText='';activeDebateReasoningText='';return;}
if(bubble.classList.contains('debate-bubble-judge')){judgeRuntimeState.decisionBubbleMap[speakerKey]=bubble;if(bubble.classList.contains('judge-streaming')&&typeof judgeHandler.createIncrementalJSONParser==='function'){judgeRuntimeState.decisionParserMap[speakerKey]=judgeHandler.createIncrementalJSONParser();roundSpeakerMap[speakerKey]='judge';}
activeDebateRole=null;activeDebateContentEl=null;activeDebateContentText='';activeDebateReasoningText='';return;}
if(roleTag==='MCP系统'){hydrateInfoBubbleFromDom(bubble,`${speakerKey}_mcp_system`,'.debate-bubble-content',mcpSystemElementMap);return;}
if(roleTag==='MCP智能体'){hydrateInfoBubbleFromDom(bubble,`${speakerKey}_mcp_output`,'.debate-bubble-content',mcpAgentOutputElementMap);return;}
if(roleTag==='MCP智能体思考'){hydrateInfoBubbleFromDom(bubble,`${speakerKey}_mcp_reasoning`,'.reasoning-content',mcpAgentReasoningElementMap);return;}
if(bubble.classList.contains('debate-bubble-pro')||bubble.classList.contains('debate-bubble-con')){activeDebateRole=bubble.classList.contains('debate-bubble-pro')?'pro':'con';activeDebateContentEl=bubble.querySelector('.debate-bubble-content');activeDebateContentText=activeDebateContentEl?.textContent||'';activeDebateReasoningText=bubble.querySelector('.reasoning-content')?.textContent||'';}});if(!activeDebateRole||!activeDebateContentEl){return;}
roundSpeakerMap[speakerKey]=activeDebateRole;messageContentElementMap[speakerKey]=activeDebateContentEl;messageContentTextMap[speakerKey]=activeDebateContentText;messageReasoningTextMap[speakerKey]=activeDebateReasoningText;}
function hydrateFromDom(){reset();for(let index=1;index<=7;index+=1){hydrateRoundFromDom(index);}
const agentPanel=document.getElementById('agent-panel');if(agentPanel){lastTopicMapSnapshot=JSON.stringify(window.liurenCasePanel?.captureTopicMap(agentPanel)||{});}}
function extractTabIndex(roundId){return roundId?roundId.split('_')[1]:'1';}
function updateTips(message){if(typeof liurenUI!=='undefined'&&liurenUI.updateTips){liurenUI.updateTips(message);}}
function reset(){roundSpeakerMap={};messageContentElementMap={};messageContentTextMap={};messageReasoningTextMap={};scopeAttemptMap={};judgeHandler.resetState(judgeRuntimeState);judgeRuntimeState=judgeHandler.createState();mcpSystemElementMap={};mcpAgentOutputElementMap={};mcpAgentReasoningElementMap={};autoScrollEnabled=true;lastTopicMapSnapshot='';pendingTopicMapSeq=0;if(scrollTimer){clearTimeout(scrollTimer);scrollTimer=null;}}
function clearRound(tabIndex){const containerId=`debate-round-${tabIndex}`;const speakerKey=`round_${tabIndex}`;const container=document.getElementById(containerId);if(container){container.innerHTML='';destroySmartScroll(containerId);}
roundSpeakerMap[speakerKey]=null;messageContentElementMap[speakerKey]=null;messageContentTextMap[speakerKey]=null;messageReasoningTextMap[speakerKey]=null;judgeHandler.clearRoundState(judgeRuntimeState,speakerKey);delete messageContentTextMap[`${speakerKey}_mcp_system`];delete messageContentTextMap[`${speakerKey}_mcp_output`];delete messageContentTextMap[`${speakerKey}_mcp_reasoning`];delete mcpSystemElementMap[`${speakerKey}_mcp_system`];delete mcpAgentOutputElementMap[`${speakerKey}_mcp_output`];delete mcpAgentReasoningElementMap[`${speakerKey}_mcp_reasoning`];Object.keys(scopeAttemptMap).forEach(function(scopeId){if(scopeId.indexOf(`round_${tabIndex}:`)===0){delete scopeAttemptMap[scopeId];}});}
function clearAll(){if(scrollTimer){clearTimeout(scrollTimer);scrollTimer=null;}
if(topicMapSyncTimer){clearTimeout(topicMapSyncTimer);topicMapSyncTimer=null;}
pendingTopicMapSeq=0;for(let index=1;index<=7;index+=1){clearRound(index);}
reset();}
return{handleMessage:handleProtocolMessage,reset,clearAll,hydrateFromDom,toggleReasoningPanel:renderer.toggleReasoningPanel};})();window.debateMessageHandler=debateMessageHandler;;const liurenJieguaAsync=(()=>{'use strict';const REASONING_CONTAINER_ID='debate-round-0';const STREAM_STATUS=liurenLocalStorage.STATUS;const CONFIG={MAX_RECONNECT_ATTEMPTS:3,RECONNECT_DELAY:2000,TASK_TIMEOUT:1800000,HEARTBEAT_INTERVAL:30000};let websocket=null;let reconnectAttempts=0;let isProcessing=false;let heartbeatTimer=null;document.addEventListener('DOMContentLoaded',init);async function init(){liurenLocalStorage.initStorage();liurenUI.setBtnState('enable');liurenUI.resetResultActions();liurenUI.bindAgentPanelEvents();const jieguaBtn=document.getElementById('jiegua');if(jieguaBtn){jieguaBtn.addEventListener('click',jiegua);}}
async function jiegua(){if(isProcessing){await cancelCurrentTask();return;}
if(!await liurenFetch.isLogin()){messageModule.error({content:'请先登录后再进行解读。'});liurenUI.setBtnState('enable');return;}
liurenUI.setBtnState('loading');scrollToResult();if(!await validateLiurenForm()){liurenUI.setBtnState('enable');return;}
if(!await liurenFetch.confirmJieguaFee()){liurenUI.setBtnState('enable');return;}
isProcessing=true;resetContentStore();prepareNewTaskStorage();try{const data=await liurenFetch.submitTask();await handleSubmitResponse(data);}catch(error){console.error('提交任务失败:',error);handleTaskError('提交解读任务失败，请重试');}}
async function handleSubmitResponse(data){if(!data||!data.success){if(data?.existing_task_id){messageModule.info({content:data.message||'正在恢复已有任务...'});await restoreExistingActiveTask(data.existing_task_id);reconnectAttempts=0;connectToWebSocket(data.existing_task_id);return;}
handleTaskError(data?.message||'提交解读任务失败，请重试');return;}
if(!data['task_id']){handleTaskError('任务ID无效，请重试');return;}
liurenLocalStorage.setStorageData('taskId',data['task_id']);reconnectAttempts=0;connectToWebSocket(data['task_id']);}
async function restoreExistingActiveTask(taskId){try{const response=await liurenFetch.fetchLatestActiveTask('liuren');const activeTask=response&&response.task;if(!activeTask||activeTask['task_id']!==taskId){throw new Error('未获取到匹配的活动任务');}
const payload=activeTask['request_payload']||{};liurenLocalStorage.batchUpdateStorageData({...payload,taskId:activeTask['task_id'],created_at:activeTask.created_at||payload.created_at||'',taskStartedAt:liurenUtils.normalizeIsoOrTimestamp(activeTask.created_at)||Date.now(),status:activeTask.status||STREAM_STATUS.PROCESSING,});const nextTaskData=liurenLocalStorage.getData();if(window.liurenRecover&&typeof window.liurenRecover.restoreTaskSnapshot==='function'){await window.liurenRecover.restoreTaskSnapshot(nextTaskData,{renderResult:true,syncButtons:false,});}
return;}catch(error){console.warn('恢复已有活动任务快照失败，回退为仅重连任务:',error);}
liurenLocalStorage.batchUpdateStorageData({taskId:taskId,taskStartedAt:Date.now(),status:STREAM_STATUS.PROCESSING,});}
function connectToWebSocket(taskId){if(!taskId){handleTaskError('任务ID无效，请刷新页面重试');return;}
isProcessing=true;closeWebSocket();const sseUrl=`/api/ai/tasks/${taskId}/stream`;websocket=new EventSource(sseUrl);websocket.onopen=function(){reconnectAttempts=0;liurenUI.updateTips('已链接智能体，正在等待解读...');};websocket.onmessage=async function(event){try{const data=JSON.parse(event.data);await handleTaskStreamMessage(data);}catch(error){console.warn('解析消息失败:',event.data,error);}};websocket.onerror=function(error){console.error('SSE 连接错误:',error);websocket.close();websocket=null;if(isProcessing){reconnectToTask(taskId);}};}
function reconnectToTask(taskId){if(reconnectAttempts>=CONFIG.MAX_RECONNECT_ATTEMPTS){handleTaskError('WebSocket 连接失败，请刷新页面重试');return;}
reconnectAttempts+=1;liurenUI.updateTips(`智能体连接中断，正在重新链接(${reconnectAttempts}/${CONFIG.MAX_RECONNECT_ATTEMPTS})...`);setTimeout(()=>connectToWebSocket(taskId),CONFIG.RECONNECT_DELAY);}
function startHeartbeat(){}
function stopHeartbeat(){if(!heartbeatTimer){return;}
clearInterval(heartbeatTimer);heartbeatTimer=null;}
function closeWebSocket(){stopHeartbeat();if(!websocket){return;}
websocket.close();websocket=null;}
function resetRuntime(){closeWebSocket();reconnectAttempts=0;isProcessing=false;}
function normalizeTaskStatus(status){const statusMap={PENDING:STREAM_STATUS.PENDING,WAITING_RESOURCE:STREAM_STATUS.WAITING_RESOURCE,RUNNING:STREAM_STATUS.PROCESSING,SUCCESS:STREAM_STATUS.COMPLETED,FAILED:STREAM_STATUS.FAILED,CANCELLED:STREAM_STATUS.CANCELLED};return statusMap[status]||status;}
function getReconnectAfterSeq(){const afterSeq=Number(liurenLocalStorage.getKeyData('lastStreamSeq')||0);return Number.isFinite(afterSeq)&&afterSeq>0?afterSeq:0;}
function persistProcessedStreamSeq(seq){const nextSeq=Number(seq||0);if(!Number.isFinite(nextSeq)||nextSeq<=0){return;}
const currentSeq=Number(liurenLocalStorage.getKeyData('lastStreamSeq')||0);if(nextSeq<=currentSeq){return;}
liurenLocalStorage.setStorageData('lastStreamSeq',nextSeq);}
async function handleTaskStreamMessage(data){switch(data.type){case'connection_established':await syncTaskStatusOnReconnect();return;case'pong':case'base_info':return;case'init':if(data.content){liurenUI.updateTips(data.content);}
return;case'phase':if(data.message){liurenUI.updateTips(data.message);}
return;case'status':await handleStatusMessage(data);return;case'base_guaxiang':if(data.content){liurenLocalStorage.setStorageData('baseGuaxiang',data.content);persistProcessedStreamSeq(data['seq']);}
return;case'reasoning':handleReasoningMessage(data.content);persistProcessedStreamSeq(data['seq']);return;case'token':case'answer':handleResultMessage(data.content);persistProcessedStreamSeq(data['seq']);return;case'agent':handleReasoningMessage(data.content,'智能体正在解读，点击这里可查看详情...');persistProcessedStreamSeq(data['seq']);return;case'debate_start':case'debate':case'debate_reasoning':case'judge_decision_stream':case'judge_decision_complete':case'judge_decision':case'judge_final_stream':case'judge_final_complete':case'round_complete':case'exchange_continue':case'consensus_reached':case'anchor_complete':case'analysis_complete':case'stage_transition':case'mcp_system':case'mcp_agent_output':case'mcp_agent_reasoning':if(typeof debateMessageHandler!=='undefined'){debateMessageHandler.handleMessage(data);}
return;case'warning':case'heartbeat':if(data.content){liurenUI.updateTips(data.content);}
persistProcessedStreamSeq(data['seq']);return;case'done':await handleTaskComplete();return;case'error':handleTaskError(data.content||'智能体服务出现错误');return;default:console.warn('未知消息类型:',data.type,data.content);}}
function handleReasoningMessage(content,tipText='智能体正在深度解读，点击这里可查看详情...'){if(!content){return;}
liurenUI.updateTips(tipText);if(typeof liurenUI.showAgentPanel==='function'){liurenUI.showAgentPanel();}
streamRenderer.render(REASONING_CONTAINER_ID,content);liurenLocalStorage.updateStorageData('reasoningProcess',content);}
function handleResultMessage(content){if(!content){return;}
liurenUI.updateTips('正在整理智能体解读结果...');streamRenderer.render('result',content);liurenLocalStorage.updateStorageData('resultAnalysis',content);}
async function syncTaskStatusOnReconnect(){const taskId=liurenLocalStorage.getKeyData('taskId');if(!taskId){return;}
try{const status=await liurenFetch.fetchTaskStatus(taskId);await handleStatusMessage(status);}catch(error){console.warn('重连后同步任务状态失败:',error);}}
async function handleStatusMessage(data){const rawStatus=data?.status||data?.content;if(!rawStatus){return;}
const normalizedStatus=normalizeTaskStatus(rawStatus);liurenLocalStorage.setStorageData('status',normalizedStatus);if(normalizedStatus===STREAM_STATUS.WAITING_RESOURCE){liurenUI.updateTips('当前智能体已满载，正在链接空闲智能体...');return;}
if(normalizedStatus===STREAM_STATUS.PROCESSING||normalizedStatus===STREAM_STATUS.PENDING){const progress=Number(data?.progress||0);if(progress>0){liurenUI.updateTips(`智能体正在解读，当前进度 ${progress}%...`);}
return;}
if(normalizedStatus===STREAM_STATUS.COMPLETED){await updateStorageFromCompletedStatus(data);isProcessing=false;finalizeCompletedView();return;}
if(normalizedStatus===STREAM_STATUS.CANCELLED){handleTaskCancelled(data?.error_message||data?.message||data?.content||'任务已取消');return;}
if(normalizedStatus===STREAM_STATUS.FAILED){handleTaskError(data?.error_message||data?.message||data?.content||'任务失败，请稍后重试');}}
async function updateStorageFromCompletedStatus(status){if(!status||normalizeTaskStatus(status.status||status.content)!==STREAM_STATUS.COMPLETED){return;}
const renderedTopicMap=captureRenderedTopicMap();const mergedTopicMap=liurenUtils.mergeTopicMaps(liurenUtils.mergeTopicMaps(status.topic_map||{},renderedTopicMap),liurenLocalStorage.getKeyData('topicMap')||{});const nextData={status:STREAM_STATUS.COMPLETED,tempCaseId:status.temp_case_id||liurenLocalStorage.getKeyData('tempCaseId')||'',resultAnalysis:status.result_analysis||liurenLocalStorage.getKeyData('resultAnalysis')||'',reasoningProcess:status.reasoning_process||liurenLocalStorage.getKeyData('reasoningProcess')||'',topicMap:mergedTopicMap};liurenLocalStorage.batchUpdateStorageData(nextData);if(nextData.resultAnalysis){streamRenderer.setContent('result',nextData.resultAnalysis);streamRenderer.flush('result');}
if(hasStructuredTopicMap(nextData.topicMap)){liurenUI.renderStructuredAgentPanel({topic_map:nextData.topicMap,reasoning_process:nextData.reasoningProcess||'',});}else if(nextData.reasoningProcess){streamRenderer.setContent(REASONING_CONTAINER_ID,nextData.reasoningProcess);streamRenderer.flush(REASONING_CONTAINER_ID);}}
function finalizeCompletedView(){liurenUI.updateTips('智能体解读完成，结果仅供参考',false);liurenUI.showAppraisePanel();liurenUI.setBtnState('success');liurenUI.enableSaveAction();}
async function handleTaskComplete(){closeWebSocket();isProcessing=false;const taskData=liurenLocalStorage.getData();if(!taskData||!taskData.taskId){finalizeCompletedView();return;}
try{const status=await liurenFetch.fetchTaskStatus(taskData.taskId);await updateStorageFromCompletedStatus(status);}catch(error){console.warn('获取最终结果失败，继续使用当前流式内容:',error);}
finalizeCompletedView();}
function handleTaskError(errorMsg){closeWebSocket();isProcessing=false;liurenLocalStorage.setStorageData('status',STREAM_STATUS.FAILED);messageModule.error({content:errorMsg||'智能体服务出现错误'});liurenUI.updateTips('处理过程中出现错误');liurenUI.setBtnState('enable');liurenUI.resetResultActions();}
function handleTaskCancelled(message){closeWebSocket();isProcessing=false;liurenLocalStorage.setStorageData('status',STREAM_STATUS.CANCELLED);messageModule.info({content:message||'任务已取消'});liurenUI.updateTips('任务已取消');liurenUI.setBtnState('enable');liurenUI.resetResultActions();}
async function cancelCurrentTask(){const taskId=liurenLocalStorage.getKeyData('taskId');if(!taskId){resetRuntime();liurenUI.setBtnState('enable');return;}
liurenUI.setBtnState('cancelling');try{const response=await liurenFetch.cancelTask(taskId);if(response&&response.success){handleTaskCancelled(response.message||'任务已取消');return;}
messageModule.warning({content:response?.message||'取消任务失败，请稍后重试'});if(isProcessing){liurenUI.setBtnState('loading');}}catch(error){console.error('取消任务失败:',error);messageModule.error({content:'取消任务失败，请稍后重试'});if(isProcessing){liurenUI.setBtnState('loading');}}}
function scrollToResult(){if(window.innerWidth>768){return;}
const result=document.getElementById('result');if(result){result.scrollIntoView({block:'start',behavior:'smooth'});}}
function resetContentStore(){streamRenderer.clear('result');streamRenderer.clear(REASONING_CONTAINER_ID);if(typeof debateMessageHandler!=='undefined'){debateMessageHandler.clearAll();}}
function prepareNewTaskStorage(){liurenLocalStorage.resetTaskRuntimeData();liurenLocalStorage.batchUpdateStorageData({status:STREAM_STATUS.PENDING,taskStartedAt:Date.now()});if(typeof liurenUI.resetAgentPanelAutoOpenState==='function'){liurenUI.resetAgentPanelAutoOpenState();}
liurenUI.resetResultActions();liurenUI.hideSharePanel();}
function hasStructuredTopicMap(topicMap){return!!topicMap&&Object.values(topicMap).some((item)=>item&&Object.keys(item).length>0);}
function captureRenderedTopicMap(){const agentPanel=document.getElementById('agent-panel');if(!agentPanel||!window.liurenCasePanel||typeof window.liurenCasePanel.captureTopicMap!=='function'){return{};}
return window.liurenCasePanel.captureTopicMap(agentPanel);}
function validateLiurenForm(){const fields={name:{element:document.getElementById('name'),error:'【请填写占问人】'},gender:{element:document.getElementById('gender'),error:'【请选择性别】'},question:{element:document.getElementById('question'),error:'【请填写占问事项】'},time:{element:document.getElementById('time'),error:'【请填写占卜时间】'},mode:{element:document.getElementById('mode'),error:'【请选择工作流模式】'},agent:{element:document.getElementById('agent'),error:'【请选择解读风格】'}};const errors=[];Object.values(fields).forEach(({element,error})=>{if(!element?.value?.trim()){errors.push(`<p>${error}</p>`);}});if(errors.length>0){messageModule.error({content:'<h3>以下信息需要完善：</h3><hr>'+errors.join(''),isHtml:true});return false;}
const birthday=document.getElementById('birthday')?.value;const identity=document.getElementById('identity')?.value?.trim();let confirmContent='';if(!birthday){confirmContent+='<h3>未填写生日信息</h3><p>可能会影响部分解读准确性，请确认是否继续？</p><hr>';}
if(!identity){confirmContent+='<h3>未填写身份信息</h3><p>可能会影响部分解读准确性，请确认是否继续？</p><hr>';}
if(confirmContent){return messageModule.confirm({content:confirmContent,isHtml:true});}
return true;}
return{connectToWebSocket,resetRuntime,};})();;(()=>{'use strict';const DEFAULT_CASE_RATING=8.0;const saveBtn=document.getElementById('save');if(saveBtn){saveBtn.addEventListener('click',saveLiuRenCase);}
async function saveLiuRenCase(){liurenUI.setSaveLoading();let taskData=liurenLocalStorage.getData();if(!validateSaveData(taskData)){liurenUI.enableSaveAction();return;}
taskData=await syncLatestTaskResultBeforeSave(taskData);if(!validateSaveData(taskData)){liurenUI.enableSaveAction();return;}
const liurenCaseData=constructLiurenCase(taskData);if(!liurenCaseData){liurenUI.enableSaveAction();return;}
try{const data=await submitSaveLiuRenCase(liurenCaseData);if(data.success){liurenLocalStorage.batchUpdateStorageData({caseId:data.case_id,shareUrl:''});messageModule.toast({content:'保存成功'});liurenUI.markSaveCompleted();liurenUI.enableShareAction();liurenUI.enableFollowAction();}else{messageModule.error({content:data.message||'保存失败'});liurenUI.enableSaveAction();}}catch(error){messageModule.error({content:error.message||'保存失败，请稍后重试'});liurenUI.enableSaveAction();}}
function validateSaveData(taskData){if(!taskData){messageModule.error({content:'任务数据未找到，请重新解卦'});return false;}
if(taskData.status!==liurenLocalStorage.STATUS.COMPLETED){messageModule.error({content:'当前解读尚未完成，请等待结果生成后再保存。'});return false;}
if(!String(taskData.resultAnalysis||'').trim()){messageModule.error({content:'请先进行解卦后再保存。'});return false;}
return true;}
async function syncLatestTaskResultBeforeSave(taskData){const taskId=taskData&&taskData.taskId;if(!taskId){return taskData;}
try{const latestStatus=await liurenFetch.fetchTaskStatus(taskId);if(!latestStatus.success||latestStatus.status!==liurenLocalStorage.STATUS.COMPLETED){return taskData;}
const renderedTopicMap=captureRenderedTopicMap();const mergedTaskData={...taskData,status:liurenLocalStorage.STATUS.COMPLETED,resultAnalysis:latestStatus.result_analysis||taskData.resultAnalysis||'',reasoningProcess:latestStatus.reasoning_process||taskData.reasoningProcess||'',tempCaseId:latestStatus.temp_case_id||taskData.tempCaseId||'',topicMap:liurenUtils.mergeTopicMaps(liurenUtils.mergeTopicMaps(latestStatus.topic_map||{},renderedTopicMap),taskData.topicMap||{})};liurenLocalStorage.batchUpdateStorageData({status:mergedTaskData.status,resultAnalysis:mergedTaskData.resultAnalysis,reasoningProcess:mergedTaskData.reasoningProcess,tempCaseId:mergedTaskData.tempCaseId,topicMap:mergedTaskData.topicMap});refreshResultDisplay(mergedTaskData);return mergedTaskData;}catch(error){console.warn('保存前同步最新任务结果失败，继续使用本地结果:',error);return taskData;}}
function captureRenderedTopicMap(){const agentPanel=document.getElementById('agent-panel');if(!agentPanel||!window.liurenCasePanel||typeof window.liurenCasePanel.captureTopicMap!=='function'){return{};}
return window.liurenCasePanel.captureTopicMap(agentPanel);}
function refreshResultDisplay(taskData){if(typeof streamRenderer!=='undefined'&&taskData.resultAnalysis){streamRenderer.setContent('result',taskData.resultAnalysis);if(typeof streamRenderer.flush==='function'){streamRenderer.flush('result');}}}
function constructLiurenCase(taskData){const payload=typeof liurenFetch!=='undefined'&&typeof liurenFetch.buildSubmitPayload==='function'?liurenFetch.buildSubmitPayload():{};const mergedTaskData={...taskData,...payload,};return{question:mergedTaskData.question||'',querent:mergedTaskData.name||'',created_at:mergedTaskData.created_at||new Date().toISOString(),time:mergedTaskData.time||'',reasoning_process:mergedTaskData.reasoningProcess||'',result_analysis:mergedTaskData.resultAnalysis||'',base_guaxiang:mergedTaskData.baseGuaxiang||'',markdown_guaxiang:mergedTaskData.markdownGuaxiang||'',topic_map:mergedTaskData.topicMap||{},rating:getRating(),is_public:getIsPublic(),temp_case_id:mergedTaskData.tempCaseId||''};}
function getRating(){const ratingElement=document.getElementById('appraise-rating-input');const rawValue=ratingElement?(ratingElement.value||ratingElement.getAttribute('value')||''):'';const parsedValue=parseFloat(rawValue);if(Number.isFinite(parsedValue)&&parsedValue>=1){return parsedValue;}
return DEFAULT_CASE_RATING;}
function getIsPublic(){const isOpenElement=document.getElementById('case-is-open');return isOpenElement?liurenUtils.toBoolean(isOpenElement.getAttribute('data-open')):false;}
async function submitSaveLiuRenCase(liurenCaseData){return liurenUtils.requestJson('/liuren/cases/save/',{method:'POST',headers:{'Content-Type':'application/json','X-CSRFToken':liurenUtils.getCookie('csrftoken')},body:JSON.stringify(liurenCaseData),credentials:'same-origin'});}})();;(()=>{'use strict';const shareBtn=document.getElementById('share');if(shareBtn){shareBtn.addEventListener('click',startShare);}
async function startShare(){const sharedUrl=liurenLocalStorage.getKeyData('shareUrl');if(sharedUrl){liurenUI.showSharePanel(sharedUrl);await copyToClipboard(sharedUrl);liurenUI.enableShareAction('复制链接');return;}
liurenUI.setShareLoading();try{const data=await submitShare();if(data.success){liurenLocalStorage.setStorageData('shareUrl',data['share_url']||'');liurenUI.showSharePanel(data['share_url']);await copyToClipboard(data['share_url']);liurenUI.enableShareAction('复制链接');}else{messageModule.error({content:data.message||'分享失败'});liurenUI.enableShareAction();}}catch(error){messageModule.error({content:error.message||'分享失败，请稍后重试'});liurenUI.enableShareAction();}}
async function submitShare(){const caseId=liurenLocalStorage.getKeyData('caseId');if(!caseId){return{success:false,message:'请先保存六壬卦例'};}
return liurenUtils.requestJson('/liuren/api/share_case/',{method:'POST',headers:{'Content-Type':'application/json','X-CSRFToken':liurenUtils.getCookie('csrftoken')},body:JSON.stringify({case_id:caseId}),credentials:'same-origin'});}
async function copyToClipboard(text){if(!text){return;}
if(navigator.clipboard){try{await navigator.clipboard.writeText(text);messageModule.toast({content:'分享链接已复制到剪贴板'});return;}catch(error){messageModule.warning({content:'系统复制失败，正在尝试兼容方案'});}}
copyToClipboardFallback(text);}
function copyToClipboardFallback(text){const textarea=document.createElement('textarea');textarea.value=text;textarea.style.position='fixed';textarea.style.opacity='0';document.body.appendChild(textarea);textarea.focus();textarea.select();try{const successful=document.execCommand('copy');if(successful){messageModule.toast({content:'分享链接已复制到剪贴板'});}else{messageModule.error({content:'自动复制失败，请手动复制分享链接'});}}catch(error){messageModule.error({content:'自动复制失败，请手动复制分享链接'});}
document.body.removeChild(textarea);}})();;(()=>{'use strict';document.addEventListener('DOMContentLoaded',init);function init(){const followBtn=document.getElementById('follow');if(!followBtn){return;}
followBtn.addEventListener('click',handleFollowClick);}
function handleFollowClick(){const followBtn=document.getElementById('follow');if(!followBtn||followBtn.classList.contains('disabled')){return;}
const taskData=liurenLocalStorage.getData()||{};const hasResult=taskData.status===liurenLocalStorage.STATUS.COMPLETED&&Boolean(String(taskData.resultAnalysis||'').trim());if(!hasResult){return;}
openFollowDialog(taskData,'你是一位精通六壬的解卦大师。用户之前已经得到了一次完整的六壬解读，现在用户有追问。请基于之前的课象和解读，回答用户的追问。');}
function openFollowDialog(taskData,systemPromptBase){closeFollowDialog();const overlay=document.createElement('div');overlay.id='follow-overlay';overlay.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:99999;display:flex;align-items:center;justify-content:center;padding:16px;';const panel=document.createElement('div');panel.id='follow-panel';panel.style.cssText='border-radius:10px;width:100%;max-width:680px;max-height:85vh;display:flex;flex-direction:column;overflow:hidden;box-shadow:0 8px 32px 0 rgba(0,0,0,0.37);backdrop-filter:blur(10px) saturate(180%);-webkit-backdrop-filter:blur(10px) saturate(180%);background:rgba(var(--bg-rgb-2),0.92);color:var(--text-color-1);border:1px solid var(--border-color-1);';const header=document.createElement('div');header.style.cssText='display:flex;justify-content:space-between;align-items:center;padding:14px 20px;border-bottom:1px solid var(--border-color-1);';const title=document.createElement('span');title.textContent='追问解读';title.style.cssText='font-size:15px;font-weight:600;color:var(--text-color-1);';header.appendChild(title);const closeBtn=document.createElement('button');closeBtn.textContent='✕';closeBtn.style.cssText='background:none;border:1px solid var(--border-color-1);border-radius:10px;font-size:14px;cursor:pointer;color:var(--text-color-1);padding:4px 10px;transition:color .3s,border-color .3s;';closeBtn.onmouseenter=function(){this.style.color='var(--primary-color)';this.style.borderColor='var(--primary-color)';};closeBtn.onmouseleave=function(){this.style.color='var(--text-color-1)';this.style.borderColor='var(--border-color-1)';};closeBtn.onclick=closeFollowDialog;header.appendChild(closeBtn);panel.appendChild(header);const body=document.createElement('div');body.style.cssText='flex:1;overflow-y:auto;padding:16px 20px;display:flex;flex-direction:column;gap:12px;scrollbar-width:thin;';const resultLabel=document.createElement('div');resultLabel.style.cssText='font-size:12px;color:var(--text-color-disabled);margin-bottom:2px;';resultLabel.textContent='原始解读';body.appendChild(resultLabel);const resultBox=document.createElement('div');resultBox.style.cssText='border-radius:5px;border:1px solid var(--border-color-1);padding:12px;font-size:13px;line-height:1.7;max-height:180px;overflow-y:auto;white-space:pre-wrap;color:var(--text-color-1);background:rgba(var(--bg-rgb-1),0.03);scrollbar-width:thin;';resultBox.textContent=taskData.resultAnalysis||'暂无';body.appendChild(resultBox);const answerBox=document.createElement('div');answerBox.id='follow-answer';answerBox.style.cssText='display:none;border-radius:5px;border:1px solid var(--border-color-1);padding:12px;font-size:14px;line-height:1.8;white-space:pre-wrap;max-height:260px;overflow-y:auto;color:var(--text-color-1);background:rgba(var(--bg-rgb-1),0.03);scrollbar-width:thin;';body.appendChild(answerBox);panel.appendChild(body);const footer=document.createElement('div');footer.style.cssText='padding:12px 20px;border-top:1px solid var(--border-color-1);display:flex;gap:8px;align-items:flex-end;';const textarea=document.createElement('textarea');textarea.id='follow-input';textarea.placeholder='输入追问内容...';textarea.style.cssText='flex:1;min-height:44px;max-height:100px;padding:10px 12px;border:1px solid var(--border-color-1);border-radius:10px;font-size:14px;resize:none;outline:none;font-family:inherit;color:var(--text-color-1);background:transparent;transition:border-color .3s;';textarea.addEventListener('focus',function(){this.style.borderColor='var(--primary-color)';});textarea.addEventListener('blur',function(){this.style.borderColor='var(--border-color-1)';});textarea.addEventListener('keydown',function(e){if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();sendFollowUp(taskData,systemPromptBase);}});const sendBtn=document.createElement('button');sendBtn.id='follow-send';sendBtn.textContent='发送';sendBtn.style.cssText='padding:10px 20px;border:1px solid var(--border-color-1);border-radius:10px;font-size:14px;cursor:pointer;white-space:nowrap;color:var(--text-color-1);background:transparent;transition:color .3s,border-color .3s,background-color .3s;';sendBtn.onmouseenter=function(){this.style.color='var(--primary-color)';this.style.borderColor='var(--primary-color)';};sendBtn.onmouseleave=function(){this.style.color='var(--text-color-1)';this.style.borderColor='var(--border-color-1)';};sendBtn.onclick=function(){sendFollowUp(taskData,systemPromptBase);};footer.appendChild(textarea);footer.appendChild(sendBtn);panel.appendChild(footer);overlay.appendChild(panel);overlay.addEventListener('click',function(e){if(e.target===overlay)closeFollowDialog();});document.body.appendChild(overlay);textarea.focus();}
function closeFollowDialog(){const overlay=document.getElementById('follow-overlay');if(overlay)overlay.remove();}
function sendFollowUp(taskData,systemPromptBase){const input=document.getElementById('follow-input');const answerBox=document.getElementById('follow-answer');const sendBtn=document.getElementById('follow-send');if(!input||!answerBox||!sendBtn)return;const question=input.value.trim();if(!question)return;sendBtn.disabled=true;sendBtn.textContent='思考中...';sendBtn.style.opacity='0.5';sendBtn.style.cursor='not-allowed';input.disabled=true;answerBox.style.display='block';answerBox.textContent='';const systemPrompt=systemPromptBase+'\n\n之前的课象信息：\n'+(typeof taskData.baseGuaxiang==='string'?taskData.baseGuaxiang:JSON.stringify(taskData.baseGuaxiang||{}))+'\n\n之前的解读结果：\n'+(taskData.resultAnalysis||'无')+'\n\n请用中文回答，保持专业但易懂。';fetch('/api/ai/follow-up',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({system_prompt:systemPrompt,user_message:question})}).then(function(response){if(!response.ok)throw new Error('请求失败');const reader=response.body.getReader();const decoder=new TextDecoder();let fullText='';function readChunk(){reader.read().then(function(result){if(result.done){sendBtn.disabled=false;sendBtn.textContent='发送';sendBtn.style.opacity='';sendBtn.style.cursor='';input.disabled=false;input.value='';return;}
const chunk=decoder.decode(result.value,{stream:true});const lines=chunk.split('\n');for(let i=0;i<lines.length;i++){if(lines[i].startsWith('data: ')){try{const data=JSON.parse(lines[i].slice(6));if(data.content){fullText+=data.content;answerBox.textContent=fullText;answerBox.scrollTop=answerBox.scrollHeight;}}catch(e){}}}
readChunk();}).catch(function(){sendBtn.disabled=false;sendBtn.textContent='发送';sendBtn.style.opacity='';sendBtn.style.cursor='';input.disabled=false;});}
readChunk();}).catch(function(){answerBox.textContent='请求失败，请重试';sendBtn.disabled=false;sendBtn.textContent='发送';sendBtn.style.opacity='';sendBtn.style.cursor='';input.disabled=false;});}})();;(()=>{'use strict';const REASONING_CONTAINER_ID='debate-round-0';const STATUS=liurenLocalStorage.STATUS;const CONFIG={TASK_TIMEOUT:1800000,};document.addEventListener('DOMContentLoaded',()=>{document.addEventListener('infoInputModuleReady',init,{once:true});});async function init(){const tempId=getTempIdFromUrl();if(tempId){await restoreFromTempCase(tempId);return;}
await restorePendingTaskIfNeeded();await restoreServerActiveTaskIfNeeded();}
function getTempIdFromUrl(){return new URLSearchParams(window.location.search).get('temp_id');}
async function restoreFromTempCase(tempId){try{const data=await liurenUtils.requestJson('/liuren/api/temp_case/show/',{method:'POST',headers:{'X-Requested-With':'XMLHttpRequest','X-CSRFToken':liurenUtils.getCookie('csrftoken'),'Content-Type':'application/json'},body:JSON.stringify({temp_id:tempId}),credentials:'same-origin'});if(!data.success||!data['case']){messageModule.error({content:data.message||'获取缓存卦例失败'});return;}
const caseData=data['case'];const nextTaskData=buildTaskDataFromTempCase(caseData);liurenLocalStorage.replaceStorage(nextTaskData);await restoreTaskSnapshot(nextTaskData,{renderResult:true,syncButtons:true,});}catch(error){console.error('从缓存卦例恢复失败:',error);messageModule.error({content:'恢复失败，请稍后重试'});}}
function buildTaskDataFromTempCase(caseData){return{...liurenLocalStorage.DEFAULT_DATA,tempCaseId:caseData.id||'',status:caseData.result_analysis?STATUS.COMPLETED:STATUS.NONE,baseGuaxiang:caseData.base_guaxiang||'',markdownGuaxiang:caseData.markdown_guaxiang||'',reasoningProcess:caseData.reasoning_process||'',resultAnalysis:caseData.result_analysis||'',topicMap:caseData.topic_map||{},mode:liurenLocalStorage.getKeyData('mode')||liurenLocalStorage.DEFAULT_DATA.mode,agent:caseData['ai_agent']||liurenLocalStorage.DEFAULT_DATA.agent,category:caseData['ai_category']||liurenLocalStorage.DEFAULT_DATA.category,};}
async function restorePendingTaskIfNeeded(){const taskData=liurenLocalStorage.getData();if(!shouldTryRestoreTask(taskData)){return;}
if(isTaskExpired(taskData)||!taskData.taskId){liurenLocalStorage.resetStorage();return;}
if(!await liurenFetch.isLogin()){liurenLocalStorage.resetStorage();return;}
try{const serverStatus=await liurenFetch.fetchTaskStatus(taskData.taskId);await restoreTaskSnapshot(taskData,{renderResult:true,syncButtons:false,});if(serverStatus.status===STATUS.COMPLETED){await restoreCompletedTask(serverStatus,taskData);return;}
if(isTaskInProgress(serverStatus.status)){reconnectTask(taskData.taskId);return;}
liurenLocalStorage.resetStorage();}catch(error){console.warn('任务恢复失败，已清理本地缓存:',error);liurenLocalStorage.resetStorage();}}
function shouldTryRestoreTask(taskData){return!!taskData&&taskData.status!==STATUS.NONE;}
function isTaskExpired(taskData){const taskStartedAt=liurenUtils.normalizeIsoOrTimestamp(taskData.taskStartedAt||taskData.created_at);return!!taskStartedAt&&Date.now()-taskStartedAt>CONFIG.TASK_TIMEOUT;}
function isTaskInProgress(status){return status===STATUS.PENDING||status===STATUS.WAITING_RESOURCE||status===STATUS.PROCESSING;}
function captureRenderedTopicMap(){const agentPanel=document.getElementById('agent-panel');if(!agentPanel||!window.liurenCasePanel||typeof window.liurenCasePanel.captureTopicMap!=='function'){return{};}
return window.liurenCasePanel.captureTopicMap(agentPanel);}
function reconnectTask(taskId){isProcessing=true;liurenUI.setBtnState('loading');liurenUI.updateTips('正在恢复任务...');liurenJieguaAsync.connectToWebSocket(taskId);}
async function restoreServerActiveTaskIfNeeded(){const taskData=liurenLocalStorage.getData();if(taskData&&taskData.taskId&&isTaskInProgress(taskData.status)){return;}
if(!await liurenFetch.isLogin()){return;}
try{const response=await liurenFetch.fetchLatestActiveTask('liuren');const activeTask=response&&response.task;if(!activeTask||!activeTask['task_id']){return;}
const payload=activeTask['request_payload']||{};liurenLocalStorage.batchUpdateStorageData({...payload,taskId:activeTask['task_id'],created_at:activeTask.created_at||payload.created_at||'',taskStartedAt:liurenUtils.normalizeIsoOrTimestamp(activeTask.created_at)||Date.now(),status:activeTask.status||STATUS.PROCESSING,});const nextTaskData=liurenLocalStorage.getData();await restoreTaskSnapshot(nextTaskData,{renderResult:true,syncButtons:false,});reconnectTask(activeTask['task_id']);}catch(error){console.warn('从服务端恢复活动任务失败:',error);}}
async function restoreCompletedTask(serverStatus,localTaskData){const renderedTopicMap=captureRenderedTopicMap();const mergedTopicMap=liurenUtils.mergeTopicMaps(liurenUtils.mergeTopicMaps(serverStatus.topic_map||{},renderedTopicMap),localTaskData.topicMap||{});const mergedTaskData={...localTaskData,status:STATUS.COMPLETED,tempCaseId:serverStatus.temp_case_id||localTaskData.tempCaseId||'',resultAnalysis:serverStatus.result_analysis||localTaskData.resultAnalysis||'',reasoningProcess:serverStatus.reasoning_process||localTaskData.reasoningProcess||'',topicMap:mergedTopicMap};liurenLocalStorage.replaceStorage({...liurenLocalStorage.DEFAULT_DATA,...mergedTaskData});await restoreTaskSnapshot(mergedTaskData,{renderResult:true,syncButtons:true,});}
async function restoreTaskSnapshot(taskData,options={}){if(!taskData){return;}
await restoreFormAndPaipan(taskData);renderTaskSnapshot(taskData,options);}
async function restoreFormAndPaipan(taskData){restoreModeField(taskData.mode);if(taskData.baseGuaxiang){await restoreFromBaseGuaxiang(taskData.baseGuaxiang,taskData.agent,taskData.category);return;}
await restoreFromTaskData(taskData);}
function restoreModeField(mode=liurenLocalStorage.DEFAULT_DATA.mode){const modeElement=document.getElementById('mode');if(modeElement&&mode){modeElement.value=mode;}}
function restoreAgentFields(agent=null,category=null){const agentElement=document.getElementById('agent');if(!agentElement){return;}
if(agent){agentElement.value=agent;}
if(category){agentElement.setAttribute('data-category',category);}}
async function restoreFromBaseGuaxiang(baseGuaxiang,agent=null,category=null){let guaxiang=baseGuaxiang;if(typeof baseGuaxiang==='string'){try{guaxiang=JSON.parse(baseGuaxiang);}catch(error){try{const jsonStr=baseGuaxiang.replace(/'/g,'"').replace(/None/g,'null').replace(/True/g,'true').replace(/False/g,'false');guaxiang=JSON.parse(jsonStr);}catch(fallbackError){console.error('解析 baseGuaxiang 失败:',error,'重试失败:',fallbackError);return;}}}
if(!guaxiang){return;}
try{if(typeof liurenPaipan!=='undefined'&&liurenPaipan.setRestoring){liurenPaipan.setRestoring(true);}
const formFieldMap={name:guaxiang['占问人']||guaxiang['姓名'],gender:guaxiang['性别'],birthday:guaxiang['生日']||'',identity:guaxiang['身份'],question:guaxiang['占问问题'],time:guaxiang['占问时间']||guaxiang['起卦时间']};Object.entries(formFieldMap).forEach(([id,value])=>{if(value===undefined||value===''){return;}
const element=document.getElementById(id);if(!element){return;}
element.value=value;element.setAttribute('value',value);});restoreAgentFields(agent,category);await liurenPaipan.restorePaipan();}finally{if(typeof liurenPaipan!=='undefined'&&liurenPaipan.setRestoring){liurenPaipan.setRestoring(false);}}}
async function restoreFromTaskData(taskData){const fieldMap={name:taskData.name,gender:taskData.gender,birthday:taskData.birthday,identity:taskData.identity,question:taskData.question,time:taskData.time};Object.entries(fieldMap).forEach(([id,value])=>{if(value===undefined){return;}
const element=document.getElementById(id);if(!element){return;}
element.value=value;element.setAttribute('value',value);});restoreAgentFields(taskData.agent,taskData.category);if(taskData['paipanData']){liurenPaipan.updateAllPanels(taskData['paipanData']);}}
function renderTaskSnapshot(taskData,options={}){const{renderResult=true,syncButtons=true,autoShowAgentPanel=false}=options;streamRenderer.clear(REASONING_CONTAINER_ID);if(renderResult){streamRenderer.clear('result');}
if(renderResult&&taskData.resultAnalysis){streamRenderer.setContent('result',taskData.resultAnalysis);}
if(hasStructuredTopicMap(taskData.topicMap)){liurenUI.renderStructuredAgentPanel({topic_map:taskData.topicMap,reasoning_process:taskData.reasoningProcess||'',});if(autoShowAgentPanel){liurenUI.showAgentPanel();}}else if(taskData.reasoningProcess){liurenUI.resetAgentPanel();streamRenderer.setContent(REASONING_CONTAINER_ID,taskData.reasoningProcess);if(autoShowAgentPanel){liurenUI.showAgentPanel();}}else{liurenUI.resetAgentPanel();}
if(syncButtons){syncActionButtons(taskData);}}
function hasStructuredTopicMap(topicMap){return!!topicMap&&Object.values(topicMap).some((item)=>item&&Object.keys(item).length>0);}
function syncActionButtons(taskData){if(taskData.status===STATUS.COMPLETED&&taskData.resultAnalysis){liurenUI.setBtnState('success');liurenUI.showAppraisePanel();liurenUI.updateTips('智能体解读完成，结果仅供参考',false);liurenUI.enableSaveAction();}else{liurenUI.setBtnState('enable');liurenUI.resetResultActions();}
if(taskData.caseId){liurenUI.markSaveCompleted();liurenUI.enableShareAction(taskData.shareUrl?'复制链接':'分享');liurenUI.enableFollowAction();}
if(taskData.shareUrl){liurenUI.showSharePanel(taskData.shareUrl);}else{liurenUI.hideSharePanel();}}
window.liurenRecover={restoreTaskSnapshot,};return{restoreTaskSnapshot,};})();;