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
async function getNotifications(){return{has_unread:false,unread_count:0};}
function updateBadge(count){const badge=document.getElementById('badge');if(badge&&count>0){badge.classList.add('show');badge.textContent=String(count);}}
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
async function init(){/* no-op - always logged in */}
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
return{render,renderElement,resetScope,flush,setContent,reset,clear,};})();;const liuyaoUI=(()=>{'use strict';const initialAgentPanelHtml=document.getElementById('agent-panel')?.innerHTML||'';let isAgentPanelDismissedByUser=false;function getButtons(){return{jiegua:document.getElementById('jiegua'),qigua:document.getElementById('qigua'),reset:document.getElementById('reset'),save:document.getElementById('save'),share:document.getElementById('share'),follow:document.getElementById('follow')};}
function setBtnState(state){const buttons=getButtons();const states={loading:{jiegua:{disabled:false,class:'remove:disabled',text:'取消'},qigua:{disabled:true,class:'add:disabled'},reset:{disabled:true,class:'add:disabled'},save:{disabled:true,class:'add:disabled'},share:{disabled:true,class:'add:disabled'},follow:{disabled:true,class:'add:disabled'}},cancelling:{jiegua:{disabled:true,class:'add:disabled',text:'取消中...'},qigua:{disabled:true,class:'add:disabled'},reset:{disabled:true,class:'add:disabled'},save:{disabled:true,class:'add:disabled'},share:{disabled:true,class:'add:disabled'},follow:{disabled:true,class:'add:disabled'}},enable:{jiegua:{disabled:false,class:'remove:disabled',text:'解读'},qigua:{disabled:false,class:'remove:disabled'},reset:{disabled:false,class:'remove:disabled'},save:{disabled:true,class:'add:disabled',text:'保存'},share:{disabled:true,class:'add:disabled',text:'分享'},follow:{disabled:true,class:'add:disabled',text:'追问'}},success:{jiegua:{disabled:true,class:'add:success',text:'已解读'},qigua:{disabled:true,class:'add:disabled'},reset:{disabled:false,class:'remove:disabled'},save:{disabled:false,class:'remove:disabled'},share:{disabled:true,class:'add:disabled',text:'分享'},follow:{disabled:false,class:'remove:disabled',text:'追问'}}};const config=states[state];if(!config)return;Object.entries(config).forEach(([key,settings])=>{const btn=buttons[key];if(!btn)return;btn.disabled=settings.disabled;if(settings.text)btn.innerHTML=settings.text;const[action,className]=settings.class.split(':');if(action==='add'){btn.classList.add(className);}else{btn.classList.remove(className);}});}
function setButtonState(buttonId,options={}){const button=document.getElementById(buttonId);if(!button){return;}
if(typeof options.disabled==='boolean'){button.disabled=options.disabled;button.classList.toggle('disabled',options.disabled);}
if(options.text){button.innerHTML=options.text;}
if(options.addClass){button.classList.add(options.addClass);}
if(options.removeClass){button.classList.remove(options.removeClass);}
if(options.addDisabledClass===false){button.classList.remove('disabled');}}
function resetResultActions(){setButtonState('save',{disabled:true,text:'保存'});setButtonState('share',{disabled:true,text:'分享'});setButtonState('follow',{disabled:true,text:'追问'});}
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
function switchDebateTab(targetId){const tabs=document.querySelectorAll('.debate-tab');const contents=document.querySelectorAll('.debate-tab-content');tabs.forEach(tab=>{const isActive=tab.getAttribute('data-tab')===targetId;tab.classList.toggle('active',isActive);});contents.forEach(content=>{content.classList.toggle('active',content.id===targetId);});}
function bindAgentPanelEvents(){const tabs=document.querySelectorAll('.debate-tab');tabs.forEach(tab=>{tab.onclick=function(){switchDebateTab(tab.getAttribute('data-tab'));};});const closeBtn=document.getElementById('agent-close-btn');if(closeBtn){closeBtn.onclick=function(){dismissAgentPanel({byUser:true});};}}
function renderStructuredAgentPanel(caseData){const agentPanel=document.getElementById('agent-panel');const tips=document.getElementById('tips');if(!agentPanel||!window.liuyaoCasePanel){return;}
const activeContentId=agentPanel.querySelector('.debate-tab-content.active')?.id||'';agentPanel.innerHTML=initialAgentPanelHtml;if(!caseData){agentPanel.classList.remove('active');if(tips){tips.style.display='none';}
return;}
window.liuyaoCasePanel.render(caseData,{agentPanel,tips,tipsText:document.getElementById('tips-text'),preserveAllRounds:true,activeContentId});bindAgentPanelEvents();if(typeof debateMessageHandler!=='undefined'&&debateMessageHandler.hydrateFromDom){debateMessageHandler.hydrateFromDom();}}
function resetAgentPanel(){const agentPanel=document.getElementById('agent-panel');if(!agentPanel){return;}
agentPanel.innerHTML=initialAgentPanelHtml;agentPanel.classList.remove('active');isAgentPanelDismissedByUser=false;bindAgentPanelEvents();}
function resetAgentPanelAutoOpenState(){isAgentPanelDismissedByUser=false;}
function showAgentPanel(options={}){const{force=false}=options;const panel=document.getElementById('agent-panel');if(!panel){return;}
if(!force&&isAgentPanelDismissedByUser){return;}
panel.classList.add('active');}
function dismissAgentPanel(options={}){const{byUser=false}=options;const panel=document.getElementById('agent-panel');if(!panel){return;}
panel.classList.remove('active');if(byUser){isAgentPanelDismissedByUser=true;}}
function updateTips(text,isActive=true){const tips=document.getElementById('tips');const tipsText=document.getElementById('tips-text');if(tipsText)tipsText.textContent=text;if(tips){tips.classList.toggle('active',isActive);}}
function showAppraisePanel(){const panel=document.getElementById('appraise-panel');if(panel)panel.classList.add('active');}
return{setBtnState,setButtonState,resetResultActions,enableSaveAction,enableFollowAction,enableShareAction,markSaveCompleted,setSaveLoading,setShareLoading,showSharePanel,hideSharePanel,bindAgentPanelEvents,renderStructuredAgentPanel,resetAgentPanel,resetAgentPanelAutoOpenState,showAgentPanel,dismissAgentPanel,updateTips,showAppraisePanel}})();;const liuyaoLocalStorage=(()=>{'use strict';const storageName='liuyao_jiegua_data';const STATUS={NONE:'none',PENDING:'pending',WAITING_RESOURCE:'waiting_resource',PROCESSING:'processing',COMPLETED:'completed',FAILED:'failed',CANCELLED:'cancelled'};const DEFAULT_DATA={status:STATUS.NONE,mode:'multi',agent:'pro',category:'liuyao',markdownGuaxiang:'',baseGuaxiang:'',resultAnalysis:'',reasoningProcess:'',topicMap:{},taskId:'',tempCaseId:'',caseId:'',created_at:'',taskStartedAt:0,shareUrl:'',lastStreamSeq:0};function normalizeDataShape(data){const nextData={...DEFAULT_DATA,...(data||{})};if(!nextData.taskId&&nextData.task_id){nextData.taskId=nextData.task_id;}
delete nextData.task_id;return nextData;}
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
function resetTaskRuntimeData(){batchUpdateStorageData({resultAnalysis:'',reasoningProcess:'',topicMap:{},taskId:'',caseId:'',tempCaseId:'',created_at:'',taskStartedAt:0,shareUrl:'',lastStreamSeq:0,status:STATUS.NONE});}
function initStorage(){const data=getData();if(!data){resetStorage();return;}
replaceStorage({...DEFAULT_DATA,...data});}
return{STATUS,DEFAULT_DATA,updateStorageData,setStorageData,batchUpdateStorageData,getData,getKeyData,replaceStorage,clearStorage,resetStorage,resetTaskRuntimeData,initStorage};})();;const liuyaoUtils=(()=>{'use strict';const DEFAULT_TIPS_TEXT='相信科学真理，反对封建迷信，算法模拟古法，解读仅供趣谈';function getCookie(name){const value=`; ${document.cookie}`;const parts=value.split(`; ${name}=`);if(parts.length===2){return parts.pop().split(';').shift();}
return'';}
function escapeHtml(value){return String(value??'').replace(/[&<>'"]/g,(char)=>{const escapeMap={'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'};return escapeMap[char]||char;});}
const MCP_HTML_PATTERN=/<div\s+class="mcp-(?:result|error)[^"]*">[\s\S]*?<\/div>|<span\s+class="mcp-(?:result|error)[^"]*">[\s\S]*?<\/span>/g;function renderMarkdownSafe(markdownText){const mcpFragments=[];const textWithPlaceholders=(markdownText||'').replace(MCP_HTML_PATTERN,function(match){const index=mcpFragments.length;mcpFragments.push(match);return'\n%%MCP_'+index+'%%\n';});const escapedText=escapeHtml(textWithPlaceholders);let html;if(typeof marked!=='undefined'&&marked.parse){try{html=marked.parse(escapedText,{breaks:true,gfm:true});}catch(error){console.warn('安全 Markdown 渲染失败，回退到纯文本模式:',error);html=escapedText.replace(/\n/g,'<br>');}}else{html=escapedText.replace(/\n/g,'<br>');}
for(let i=0;i<mcpFragments.length;i++){html=html.replace('<p>%%MCP_'+i+'%%</p>',mcpFragments[i]);html=html.replace('%%MCP_'+i+'%%',mcpFragments[i]);}
return html;}
function sanitizeHtmlFragment(html){const template=document.createElement('template');template.innerHTML=String(html||'');const allowedTags=new Set(['div','span','p','br','strong','em','b','i','u','s','small','sub','sup','ul','ol','li','pre','code','blockquote','hr','h1','h2','h3','h4','h5','h6','table','thead','tbody','tfoot','tr','td','th','section','article','header','footer','main','label','button','svg','path','g','circle','line','polyline','polygon','rect','ellipse']);const dropTags=new Set(['script','style','iframe','object','embed','link','meta','title','form','input','textarea','select','option']);const unwrapTags=new Set(['html','body','head','template']);const allowedAttrs=new Set(['id','class','role','title','type','aria-label','aria-hidden','aria-controls','aria-expanded','viewBox','fill','stroke','stroke-width','d','cx','cy','r','x','y','x1','x2','y1','y2','points']);const urlAttrs=new Set(['href','src','xlink:href']);function isSafeUrl(value){const normalized=String(value||'').trim().toLowerCase();if(!normalized){return true;}
if(normalized.startsWith('#')||normalized.startsWith('/')){return true;}
return/^(https?:|mailto:|tel:|data:image\/)/.test(normalized);}
function sanitizeElement(element){Array.from(element.childNodes).forEach((child)=>{if(child.nodeType===Node.COMMENT_NODE){child.remove();return;}
if(child.nodeType!==Node.ELEMENT_NODE){return;}
const tagName=child.tagName.toLowerCase();if(dropTags.has(tagName)){child.remove();return;}
if(unwrapTags.has(tagName)||!allowedTags.has(tagName)){const fragment=document.createDocumentFragment();while(child.firstChild){fragment.appendChild(child.firstChild);}
child.replaceWith(fragment);sanitizeElement(element);return;}
Array.from(child.attributes).forEach((attr)=>{const attrName=attr.name;const lowerAttrName=attrName.toLowerCase();const attrValue=attr.value;if(lowerAttrName.startsWith('on')){child.removeAttribute(attrName);return;}
if(urlAttrs.has(lowerAttrName)&&!isSafeUrl(attrValue)){child.removeAttribute(attrName);return;}
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
function buildGuaxiangHtml(){const name=escapeHtml(document.getElementById('name')?.value?.trim()||'');const gender=escapeHtml(document.getElementById('gender')?.value?.trim()||'');const birthday=escapeHtml(document.getElementById('birthday')?.value||'');const identity=escapeHtml(document.getElementById('identity')?.value?.trim()||'');const question=escapeHtml(document.getElementById('question')?.value?.trim()||'');const time=escapeHtml(document.getElementById('time')?.value||'');const ganzhiElement=document.getElementById('gz');const shenshaElement=document.getElementById('shensha');const paipanElement=document.getElementById('paipan');if(!ganzhiElement&&!shenshaElement&&!paipanElement){return'';}
return`
            <!DOCTYPE html>
            <html lang="zh">
            <head>
                <meta charset="UTF-8">
                <title>六爻排盘</title>
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
                    ${ganzhiElement ? ganzhiElement.outerHTML : ''}
                    ${shenshaElement ? shenshaElement.outerHTML : ''}
                    ${paipanElement ? paipanElement.outerHTML : ''}
                </div>
            </body>
            </html>`;}
return{DEFAULT_TIPS_TEXT,getCookie,escapeHtml,renderMarkdownSafe,sanitizeHtmlFragment,requestJson,toBoolean,normalizeIsoOrTimestamp,mergeTopicMaps,buildGuaxiangHtml};})();window.liuyaoUtils=liuyaoUtils;;const liuyaoCasePanel=(()=>{'use strict';const TOPIC_CONFIGS=[{field:'yongshen_analysis',tabId:'tab-round-1',contentId:'debate-round-1',title:'用神取用'},{field:'shiying_analysis',tabId:'tab-round-2',contentId:'debate-round-2',title:'世应关系'},{field:'dongyao_analysis',tabId:'tab-round-3',contentId:'debate-round-3',title:'动爻分析'},{field:'xianshi_analysis',tabId:'tab-round-4',contentId:'debate-round-4',title:'现实对轨'},{field:'yingqi_analysis',tabId:'tab-round-5',contentId:'debate-round-5',title:'应期推断'}];const ROUND_ID_MAP={yongshen_analysis:'round_1',shiying_analysis:'round_2',dongyao_analysis:'round_3',xianshi_analysis:'round_4',yingqi_analysis:'round_5'};const ROLE_META={pro:{label:'正方',bubbleClass:'debate-bubble-pro'},con:{label:'反方',bubbleClass:'debate-bubble-con'},judge:{label:'裁判',bubbleClass:'debate-bubble-judge'}};function render(caseData,options={}){const agentPanel=options.agentPanel;const tips=options.tips;const tipsText=options.tipsText||document.getElementById('tips-text');const preserveAllRounds=options.preserveAllRounds===true;const activeContentId=options.activeContentId||'';if(!agentPanel){return;}
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
                <h3>${liuyaoUtils.escapeHtml(title)}</h3>
                <span class="debate-start-tag">${completed ? '已完成' : '未完成'}</span>
            </div>
        `;}
function renderEntry(entry){const entryType=String(entry?.type||'').trim();if(entryType==='debate'){return buildDebateBubbleHtml(entry);}
if(entryType==='judge_decision'){return buildJudgeDecisionHtml(entry);}
if(entryType==='judge_final'){return buildJudgeFinalHtml(entry);}
if(entryType==='info'){return buildInfoBubbleHtml(entry.title||'说明',entry.content_markdown||'','debate-bubble-default',Boolean(entry.reasoning_only));}
if(entryType==='markdown'){return buildInfoBubbleHtml('记录',entry.content_markdown||'','debate-bubble-default',false);}
return'';}
function buildDebateBubbleHtml(entry){const roleMeta=ROLE_META[entry.role]||{label:entry.role_label||'发言',bubbleClass:'debate-bubble-default'};const reasoningHtml=liuyaoUtils.renderMarkdownSafe(entry.reasoning_markdown||'');const contentHtml=liuyaoUtils.renderMarkdownSafe(entry.content_markdown||'');if(!reasoningHtml&&!contentHtml){return'';}
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
                    <span class="debate-role-tag">${liuyaoUtils.escapeHtml(entry.role_label || roleMeta.label)}</span>
                </div>
                ${reasoningBlock}
                <div class="debate-bubble-content">${contentHtml}</div>
            </div>
        `;}
function buildJudgeDecisionHtml(entry){const isDebating=String(entry.status||'').trim()==='debating';const statusText=isDebating?'需要继续讨论':'裁决完成';const statusClass=isDebating?'judge-status judge-status-continue':'judge-status judge-status-consensus';const reasonHtml=liuyaoUtils.renderMarkdownSafe(entry.reason_markdown||'');const nextInstructionHtml=liuyaoUtils.renderMarkdownSafe(entry.next_instruction_markdown||'');const finalContentHtml=liuyaoUtils.renderMarkdownSafe(entry.final_content_markdown||'');if(!reasonHtml&&!nextInstructionHtml&&!finalContentHtml){return'';}
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
function buildJudgeFinalHtml(entry){const contentHtml=liuyaoUtils.renderMarkdownSafe(entry.content_markdown||'');if(!contentHtml){return'';}
return`
            <div class="debate-bubble debate-bubble-judge-final">
                <div class="debate-bubble-header">
                    <span class="debate-role-tag">裁判结论</span>
                    <span class="judge-status judge-status-final">已完成</span>
                </div>
                <div class="debate-bubble-content final-content">${contentHtml}</div>
            </div>
        `;}
function buildInfoBubbleHtml(title,markdown,bubbleClass,reasoningOnly){const contentHtml=liuyaoUtils.renderMarkdownSafe(markdown||'');if(!contentHtml){return'';}
if(reasoningOnly){return`
                <div class="debate-bubble ${bubbleClass}">
                    <div class="reasoning-collapsible collapsed">
                        <div class="reasoning-header">
                            <span class="reasoning-toggle-icon">
                                <svg viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"></path></svg>
                            </span>
                            <span>${liuyaoUtils.escapeHtml(title)}</span>
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
                    <span class="debate-role-tag">${liuyaoUtils.escapeHtml(title)}</span>
                </div>
                <div class="debate-bubble-content">${contentHtml}</div>
            </div>
        `;}
function bindPanelInteractions(agentPanel,tips){if(tips&&!tips.dataset.agentPanelBound){tips.addEventListener('click',()=>{if(!agentPanel.isConnected){return;}
if(window.liuyaoUI&&typeof liuyaoUI.showAgentPanel==='function'){liuyaoUI.showAgentPanel({force:true});return;}
agentPanel.classList.add('active');});tips.dataset.agentPanelBound='true';}
const closeBtn=agentPanel.querySelector('#agent-close-btn');if(closeBtn&&!closeBtn.dataset.panelBound){closeBtn.addEventListener('click',()=>{if(window.liuyaoUI&&typeof liuyaoUI.dismissAgentPanel==='function'){liuyaoUI.dismissAgentPanel({byUser:true});return;}
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
const topicMap={};TOPIC_CONFIGS.forEach((config)=>{const content=agentPanel.querySelector(`#${config.contentId}`);const tab=agentPanel.querySelector(`#${config.tabId}`);const topicPayload=captureTopicRound(content,tab,config);topicMap[config.field]=topicPayload;});return topicMap;}
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
return{render,captureTopicMap};})();window.liuyaoCasePanel=liuyaoCasePanel;;let liuyaoGuaciData=(()=>{"use strict";const GUACI_DATA={"乾为天":{"卦辞":"乾：元，亨，利，贞。","彖曰":"大哉乾元，万物资始，乃统天。云行雨施，品物流形。大明始终，六位时成，时乘六龙以御天。乾道变化，各正性命，保合大和，乃利贞。首出庶物，万国咸宁。","象曰":"天行健，君子以自强不息。","初爻":"初九：潜龙勿用。象曰：潜龙勿用，阳在下也。","二爻":"九二：见龙在田，利见大人。象曰：见龙在田，德施普也。","三爻":"九三：君子终日乾乾，夕惕若厉，无咎。象曰：终日乾乾，反复道也。","四爻":"九四：或跃在渊，无咎。象曰：或跃在渊，进无咎也。","五爻":"九五：飞龙在天，利见大人。象曰：飞龙在天，大人造也。","六爻":"九上：亢龙有悔。象曰：亢龙有悔，盈不可久也。",},"坤为地":{"卦辞":"坤：元亨，利牝马之贞。君子有攸往，先迷后得主。利西南得朋，东北丧朋。安贞吉。","彖曰":"至哉坤元，万物资生，乃顺承天。坤厚载物，德合无疆。含弘光大，品物咸亨。牝马地类，行地无疆，柔顺利贞。君子攸行，先迷失道，后顺得常。西南得朋，乃与类行；东北丧朋，乃终有庆。安贞之吉，应地无疆。","象曰":"地势坤，君子以厚德载物。","初爻":"初六：履霜，坚冰至。象曰：履霜坚冰，阴始凝也。驯致其道，至坚冰也","二爻":"六二：直方大，不习，无不利。象曰：六二之动，直以方也。不习，无不利，地道光也。","三爻":"六三：含章可贞。或从王事，无成有终。象曰：含章可贞；以时发也。或从王事，知光大也。","四爻":"六四：括囊，无咎无誉。象曰：括囊无咎，慎不害也。","五爻":"六五：黄裳，元吉。象曰：黄裳元吉，文在中也。","六爻":"上六：龙战于野，其血玄黄。象曰：龙战于野，其道穷也。"},"水雷屯":{"卦辞":"屯：元亨，利贞。勿用有攸往，利建侯。","彖曰":"屯，刚柔始交而难生。动乎险中，大亨贞。雷雨之动满盈，天造草昧，宜建侯而不宁。","象曰":"云雷，屯。君子以经纶。","初爻":"初九：磐桓，利居贞，利建侯。象曰：虽磐桓，志行正也。以贵下贱，大得民也。","二爻":"六二：屯如邅如，乘马班如。匪寇，婚媾，女子贞不字，十年乃字。象曰：六二之难，乘刚也。十年乃字，反常也。","三爻":"六三：既鹿无虞，惟入于林中。君子几，不如舍，往吝。象曰：既鹿无虞，以纵禽也。君子舍之，往吝，穷也。","四爻":"六四：乘马班如，求婚媾，往吉，无不利。象曰：求而往，明也。","五爻":"九五：屯其膏，小贞吉，大贞凶。象曰：屯其膏，施未光也。","六爻":"上六：乘马班如，泣血涟如。象曰：泣血涟如，何可长也。"},"山水蒙":{"卦辞":"蒙：亨。匪我求童蒙，童蒙求我。初噬告，再三渎，渎则不告。利贞。","彖曰":"蒙，山下有险，险而止，蒙。蒙亨，以亨行时中也。匪我求童蒙，童蒙求我，志应也。初噬告，以刚中也。再三渎，渎则不告，渎蒙也。蒙以养正，圣功也。","象曰":"山下出泉，蒙。君子以果行育德。","初爻":"初六：发蒙，利用刑人，用说桎梏；以往吝。象曰：利用刑人，以正法也。","二爻":"九二：包蒙，吉。纳妇，吉；子克家。象曰：子克家，刚柔接也。","三爻":"六三：勿用娶女，见金夫，不有躬，无攸利。象曰：勿用娶女，行不顺也。","四爻":"六四：困蒙，吝。象曰：困蒙之吝，独远实也。","五爻":"六五：童蒙，吉。象曰：童蒙之吉，顺以巽也。","六爻":"上九：击蒙，不利为寇，利御寇。象曰：利用御寇，上下顺也。"},"水天需":{"卦辞":"需：有孚，光亨，贞吉。利涉大川。","彖曰":"需，须也，险在前也。刚健而不陷，其义不困穷矣。需有孚，光亨，贞吉。位乎天位，以正中也。利涉大川，往有功也。","象曰":"云上於天，需。君子以饮食宴乐。","初爻":"初九：需于郊，利用恒，无咎。象曰：需于郊，不犯难行也。利用恒，无咎；未失常也。","二爻":"九二：需于沙，小有言，终吉。象曰：需于沙，衍在中也。虽小有言，以终吉也。","三爻":"九三：需于泥，致寇至。象曰：需于泥，灾在外也。自我致寇，敬慎不败也。","四爻":"六四：需于血，出自穴。象曰：需于血，顺以听也。","五爻":"九五：需于酒食，贞吉。象曰：酒食贞吉，以中正也。","六爻":"上六：入于穴，有不速之客三人来，敬之终吉。象曰：不速之客来，敬之终吉。虽不当位，未大失也。"},"天水讼":{"卦辞":"讼：有孚，窒惕，中吉。终凶。利见大人，不利涉大川。","彖曰":"讼，上刚下险，险而健，讼。讼有孚，窒惕，中吉，刚来而得中也。终凶，讼不可成也。利见大人，尚中正也。不利涉大川，入于渊也。","象曰":"天与水违行，讼。君子以作事谋始。","初爻":"初六：不永所事，小有言，终吉。象曰：不永所事，讼不可长也。虽有小言，其辩明也。","二爻":"九二：不克讼，归而逋，其邑人三百户无眚。象曰：不克讼，归逋窜也。自下讼上，患至掇也。","三爻":"六三：食旧德，贞厉，终吉。或从王事，无成。象曰：食旧德，从上吉也。","四爻":"九四：不克讼，复自命，渝安贞，吉。象曰：复即命，渝安贞；不失也。","五爻":"九五：讼，元吉。象曰：讼，元吉，以中正也。","六爻":"上九：或锡之鞶带，终朝三褫之。象曰：以讼受福，亦不足敬也。"},"地水师":{"卦辞":"师：贞，丈人吉，无咎。","彖曰":"师，众也，贞正也，能以众正，可以王矣。刚中而应，行险而顺，以此毒天下，而民从之，吉又何咎矣？","象曰":"地中有水，师，君子以容民蓄众。","初爻":"初六：师出以律，否臧凶。象曰：师出以律，失律凶也。","二爻":"九二：在师，中吉，无咎，王三锡命。象曰：在师中吉，承天宠也。王三锡命，怀万邦也。","三爻":"六三：师或舆尸，凶。象曰：师或舆尸，大无功也。","四爻":"六四：师左次，无咎。象曰：左次无咎，未失常也。","五爻":"六五：田有禽，利执；言，无咎。长子帅师，弟子舆尸，贞凶。象曰：长子帅师，以中行也。弟子舆师，使不当也。","六爻":"上六：大君有命，开国承家，小人勿用。象曰：大君有命，以正功也。小人勿用，必乱邦也。"},"水地比":{"卦辞":"比：吉。原筮，元永贞，无咎。不宁方来，后夫凶。","彖曰":"比，吉也。比，辅也，下顺从也。原筮，元永贞，无咎，以刚中也。不宁方来，上下应也。后夫凶，其道穷也。","象曰":"地上有水，比。先王以建万国，亲诸侯。","初爻":"初六：有孚比之，无咎。有孚盈缶，终来有它吉。象曰：比之初六，有它吉也。","二爻":"六二：比之自内，贞吉。象曰：比之自内，不自失也。","三爻":"六三：比之匪人。象曰：比之匪人，不亦伤乎？","四爻":"六四：外比之，贞吉。象曰：外比于贤，以从上也。","五爻":"九五：显比，王用三驱，失前禽。邑人不诫，吉。象曰：显比之吉，位正中也。舍逆取顺，失前禽也。邑人不诫，上使中也。","六爻":"上六：比之无首，凶。象曰：比之无首，无所终也。"},"风天小畜":{"卦辞":"小畜：亨。密云不雨，自我西郊。","彖曰":"小畜；柔得位而上下应之，曰小畜。健而巽，刚中而志行，乃亨。密云不雨，尚往也。自我西郊，施未行也。","象曰":"风行天上，小畜。君子以懿文德。","初爻":"初九：复自道，何其咎？吉。象曰：复自道，其义吉也。","二爻":"九二：牵复，吉。象曰：牵复在中，亦不自失也。","三爻":"九三：舆说辐，夫妻反目。象曰：夫妻反目，不能正室也。","四爻":"六四：有孚，血去惕出，无咎。象曰：有孚惕出，上合志也。","五爻":"九五：有孚挛如，富以其邻。象曰：有孚挛如，不独富也。","六爻":"上九：既雨既处，尚德载。妇贞厉。月几望，君子征凶。象曰：既雨既处，德积载也。君子征凶，有所疑也。"},"天泽履":{"卦辞":"履：履虎尾，不咥人，亨。","彖曰":"履，柔履刚也。说而应乎乾，是以履虎尾，不咥人，亨。刚中正，履帝位而不疚，光明也。","象曰":"上天下泽，履。君子以辨上下，定民志。","初爻":"初九：素履往，无咎。象曰：素履之往，独行愿也。","二爻":"九二：履道坦坦，幽人贞吉。象曰：幽人贞吉，中不自乱也。","三爻":"六三：眇能视，跛能履。履虎尾，咥人，凶。武人为于大君。象曰：眇能视，不足以有明也。跛能履，不足以与行也。咥人之凶，位不当也。武人为于大君，志刚也。","四爻":"九四：履虎尾，愬愬，终吉。象曰：愬愬终吉，志行也。","五爻":"九五：夬履，贞厉。象曰：夬履贞厉，位正当也。","六爻":"上九：视履考祥，其旋元吉。象曰：元吉在上，大有庆也。"},"地天泰":{"卦辞":"泰：小往大来，吉亨。","彖曰":"泰，小往大来，吉亨。则是天地交而万物通也，上下交而其志同也。内阳而外阴，内健而外顺，内君子而外小人。君子道长，小人道消也。","象曰":"天地交，泰。后以财成天地之道，辅相天地之宜，以左右民。","初爻":"初九：拔茅茹，以其汇，征吉。象曰：拔茅征吉，志在外也。","二爻":"九二：包荒，用冯河，不遐遗。朋亡，得尚于中行。象曰：包荒，得尚于中行，以光大也。","三爻":"九三：无平不陂，无往不复，艰贞无咎。勿恤其孚，于食有福。象曰：无往不复，天地际也。","四爻":"六四：翩翩，不富以其邻，不戒以孚。象曰：翩翩不富，皆失实也。不戒以孚，中心愿也。","五爻":"六五：帝乙归妹，以祉元吉。象曰：以祉元吉，中以行愿也。","六爻":"上六：城复于隍，勿用师。自邑告命，贞吝。象曰：城复于隍，其命乱也。"},"天地否":{"卦辞":"否：否之匪人，不利君子贞，大往小来。","彖曰":"否之匪人，不利君子贞，大往小来。则是天地不交而万物不通也，上下不交，而天下无邦也。内阴而外阳，内柔而外刚，内小人而外君子。小人道长，君子道消也。","象曰":"天地不交，否。君子以俭德辟难，不可荣以禄。","初爻":"初六：拔茅茹，以其汇，贞吉，亨。象曰：拔茅贞吉，志在君也。","二爻":"六二：包承，小人吉，大人否，亨。象曰：大人否，亨，不乱群也。","三爻":"六三：包羞。象曰：包羞，位不当也。","四爻":"九四：有命无咎，畴离祉。象曰：有命无咎，志行也。","五爻":"九五：休否，大人吉。其亡其亡，系于苞桑。象曰：大人之吉，位正当也。","六爻":"上九：倾否，先否后喜。象曰：否终则倾，何可长也。"},"天火同人":{"卦辞":"同人：同人于野，亨。利涉大川，利君子贞。","彖曰":"同人，柔得位得中，而应乎乾，曰同人。同人曰，同人于野，亨。利涉大川，乾行也。文明以健，中正而应，君子正也。唯君子为能通天下之志。","象曰":"天与火，同人。君子以类族辨物。","初爻":"初九：同人于门，无咎。象曰：出门同人，又谁咎也。","二爻":"六二：同人于宗，吝。象曰：同人于宗，吝道也。","三爻":"九三：伏戎于莽，升其高陵，三岁不兴。象曰：伏戎于莽，敌刚也。三岁不兴，安行也。","四爻":"九四：乘其墉，弗克攻，吉。象曰：乘其墉，义弗克也，其吉，则困而反则也。","五爻":"九五：同人，先号咷而后笑。大师克相遇。象曰：同人之先，以中直也。大师相遇，言相克也。","六爻":"上九：同人于郊，无悔。象曰：同人于郊，志未得也。"},"火天大有":{"卦辞":"大有：元亨。","彖曰":"大有，柔得尊位，大中而上下应之，曰大有。其德刚健而文明，应乎天而时行，是以元亨。","象曰":"火在天上，大有。君子以遏恶扬善，顺天休命。","初爻":"初九：无交害，匪咎，艰则无咎。象曰：大有初九，无交害也。","二爻":"九二：大车以载，有攸往，无咎。象曰：大车以载，积中不败也。","三爻":"九三：公用亨于天子，小人弗克。象曰：公用亨于天子，小人害也。","四爻":"九四：匪其彭，无咎。象曰：匪其彭，无咎，明辨晰也。","五爻":"六五：厥孚交如，威如，吉。象曰：厥孚交如，信以发志也。威如之吉，易而无备也。","六爻":"上九：自天佑之，吉无不利。象曰：大有上吉，自天佑也。"},"地山谦":{"卦辞":"谦：亨，君子有终。","彖曰":"谦，亨。天道下济而光明，地道卑而上行。天道亏盈而益谦，地道变盈而流谦，鬼神害盈而福谦，人道恶盈而好谦。谦尊而光，卑而不可踰，君子之终也。","象曰":"地中有山，谦。君子以裒多益寡，称物平施。","初爻":"初六：谦谦君子，用涉大川，吉。象曰：谦谦君子，卑以自牧也。","二爻":"六二：鸣谦，贞吉。象曰：鸣谦贞吉，中心得也。","三爻":"九三：劳谦君子，有终，吉。象曰：劳谦君子，万民服也。","四爻":"六四：无不利，㧑谦。象曰：无不利，㧑谦，不违则也。","五爻":"六五：不富以其邻，利用侵伐，无不利。象曰：利用侵伐，征不服也。","六爻":"上六：鸣谦，利用行师，征邑国。象曰：鸣谦，志未得也。可用行师，征邑国也。"},"雷地豫":{"卦辞":"豫：利建侯行师。","彖曰":"豫，刚应而志行，顺以动，豫。豫，顺以动，故天地如之，而况建侯行师乎！天地以顺动，故日月不过而四时不忒。圣人以顺动，则刑罚清而民服。豫之时义大矣哉！","象曰":"雷出地奋，豫。先王以作乐崇德，殷荐之上帝，以配祖考。","初爻":"初六：鸣豫，凶。象曰：初六鸣豫，志穷凶也。","二爻":"六二：介于石，不终日，贞吉。象曰：不终日，贞吉；以中正也。","三爻":"六三：盱豫，悔。迟有悔。象曰：盱豫有悔，位不当也。","四爻":"九四：由豫，大有得。勿疑，朋盍簪。象曰：由豫大有得，志大行也。","五爻":"六五：贞疾，恒不死。象曰：六五贞疾，乘刚也。恒不死，中未亡也。","六爻":"上六：冥豫，成有渝，无咎。象曰：冥豫在上，何可长也？"},"泽雷随":{"卦辞":"随：元亨利贞，无咎。","彖曰":"随，刚来而下柔，动而说，随。大亨贞，无咎，而天下随时。随之时义大矣哉！","象曰":"泽中有雷，随。君子以向晦入宴息。","初爻":"初九：官有渝，贞吉。出门交有功。象曰：官有渝，从正吉也。出门交有功，不失也。","二爻":"六二：系小子，失丈夫。象曰：系小子，弗兼与也。","三爻":"六三：系丈夫，失小子。随有求，得，利居贞。象曰：系丈夫，志舍下也。","四爻":"九四：随有获，贞凶。有孚，在道以明，何咎？象曰：随有获，其义凶也。有孚在道，明功也。","五爻":"九五：孚于嘉，吉。象曰：孚于嘉吉，位正中也。","六爻":"上六：拘系之，乃从维之。王用亨于西山。象曰：拘系之，上穷也。"},"山风蛊":{"卦辞":"蛊：元亨，利涉大川。先甲三日，后甲三日。","彖曰":"蛊，刚上而柔下，巽而止，蛊。蛊，元亨，而天下治也。利涉大川，往有事也。先甲三日，后甲三日，终则有始，天行也。","象曰":"山下有风，蛊。君子以振民育德。","初爻":"初六：干父之蛊，有子，考无咎，厉终吉。象曰：干父之蛊，意承考也。","二爻":"九二：干母之蛊，不可贞。象曰：干母之蛊，得中道也。","三爻":"九三：干父之蛊，小有晦，无大咎。象曰：干父之蛊，终无咎也。","四爻":"六四：裕父之蛊，往见吝。象曰：裕父之蛊，往未得也。","五爻":"六五：干父之蛊，用誉。象曰：干父用誉，承以德也。","六爻":"上九：不事王侯，高尚其事。象曰：不事王侯，志可则也。"},"地泽临":{"卦辞":"临：元，亨，利，贞。至于八月有凶。","彖曰":"临，刚浸而长。说而顺，刚中而应。大亨以正，天之道也。至于八月有凶，消不久也。","象曰":"泽上有地，临。君子以教思无穷，容保民无疆。","初爻":"初九：咸临，贞吉。象曰：咸临贞吉，志行正也。","二爻":"九二：咸临，吉，无不利。象曰：咸临，吉，无不利，未顺命也。","三爻":"六三：甘临，无攸利。既忧之，无咎。象曰：甘临，位不当也。既忧之，咎不长也。","四爻":"六四：至临，无咎。象曰：至临无咎，位当也。","五爻":"六五：知临，大君之宜，吉。象曰：大君之宜，行中之谓也。","六爻":"上六：敦临，吉，无咎。象曰：敦临之吉，志在内也。"},"风地观":{"卦辞":"观：盥而不荐，有孚颙若。","彖曰":"大观在上，顺而巽，中正以观天下，观。盥而不荐，有孚颙若，下观而化也。观天之神道，而四时不忒。圣人以神道设教，而天下服矣。","象曰":"风行地上，观。先王以省方观民设教","初爻":"初六：童观，小人无咎，君子吝。象曰：初六童观，小人道也。","二爻":"六二：窥观，利女贞。象曰：窥观女贞，亦可丑也。","三爻":"六三：观我生，进退。象曰：观我生进退，未失道也。","四爻":"六四：观国之光，利用宾于王。象曰：观国之光，尚宾也。","五爻":"九五：观我生，君子无咎。象曰：观我生，观民也。","六爻":"上九：观其生，君子无咎。象曰：观其生，志未平也。"},"火雷噬嗑":{"卦辞":"噬嗑：亨。利用狱。","彖曰":"颐中有物曰噬嗑。噬嗑而亨，刚柔分，动而明，雷电合而章。柔得中而上行，虽不当位，利用狱也。","象曰":"雷电噬嗑。先王以明罚敕法。","初爻":"初九：履校灭趾，无咎。象曰：履校灭趾，不行也。","二爻":"六二：噬肤灭鼻，无咎。象曰：噬肤灭鼻，乘刚也。","三爻":"六三：噬腊肉，遇毒。小吝，无咎。象曰：遇毒，位不当也。","四爻":"九四：噬干胏，得金矢。利艰贞，吉。象曰：利艰贞吉，未光也。","五爻":"六五：噬干肉得黄金。贞厉，无咎。象曰：贞厉无咎，得当也。","六爻":"上九：何校灭耳，凶。象曰：何校灭耳，聪不明也。"},"山火贲":{"卦辞":"贲：亨。小利有所往。","彖曰":"贲，亨，柔来而文刚，故亨。分刚上而文柔，故小利有攸往，天文也。文明以止，人文也。观乎天文，以察时变；观乎人文，以化成天下。","象曰":"山下有火，贲。君子以明庶政，无敢折狱。","初爻":"初九：贲其趾，舍车而徒。象曰：舍车而徒，义弗乘也。","二爻":"六二：贲其须。象曰：贲其须，与上兴也。","三爻":"九三：贲如，濡如，永贞吉。象曰：永贞之吉，终莫之陵也。","四爻":"六四：贲如，皤如，白马翰如，匪寇婚媾。象曰：六四，当位疑也。匪寇婚媾，终无尤也。","五爻":"六五：贲于丘园，束帛戋戋。吝，终吉。象曰：六五之吉，有喜也。","六爻":"上九：白贲，无咎。象曰：白贲无咎，上得志也。"},"山地剥":{"卦辞":"剥：不利有攸往。","彖曰":"剥，剥也。柔变刚也。不利有攸往，小人长也。顺而止之，观象也。君子尚消息盈虚，天行也。","象曰":"山附地上，剥。上以厚下安宅。","初爻":"初六：剥床以足，蔑贞，凶。象曰：剥床以足，以灭下也。","二爻":"六二：剥床以辨，蔑贞，凶。象曰：剥床以辨，未有与也。","三爻":"六三：剥之，无咎。象曰：剥之无咎，失上下也。","四爻":"六四：剥床以肤，凶。象曰：剥床以肤，切近灾也。","五爻":"六五：贯鱼。以宫人宠，无不利。象曰：以宫人宠，终无尤也。","六爻":"上九：硕果不食，君子得舆，小人剥庐。象曰：君子得舆，民所载也。小人剥庐，终不可用也。"},"地雷复":{"卦辞":"复：亨。出入无疾，朋来无咎。反复其道，七日来复，利有攸往。","彖曰":"复。亨。刚反，动而以顺行，是以出入无疾，朋来无咎。反复其道，七日来复，天行也。利有攸往，刚长也。复其见天地之心乎？","象曰":"雷在地中，复。先王以至日闭关，商旅不行，后不省方。","初爻":"初九：不远复，无祗悔，元吉。象曰：不远之复，以修身也。","二爻":"六二：休复，吉。象曰：休复之吉，以下仁也。","三爻":"六三：频复，厉，无咎。象曰：频复之厉，义无咎也。","四爻":"六四：中行独复。象曰：中行独复，以从道也。","五爻":"六五：敦复，无悔。象曰：敦复无悔，中以自考也。","六爻":"上六：迷复，凶，有灾眚。用行师，终有大败，以其国君凶，至于十年，不克征。象曰：迷复之凶，反君道也。"},"天雷无妄":{"卦辞":"无妄：元亨利贞。其匪正有眚，不利有攸往。","彖曰":"无妄，刚自外来而为主于内。动而健，刚中而应，大亨以正，天之命也。其匪正有眚，不利有攸往。无妄之往，何之矣？天命不佑，行矣哉？","象曰":"天下雷行，物与无妄。先王以茂对时，育万物。","初爻":"初九：无妄，往吉。象曰：无妄之往，得志也。","二爻":"六二：不耕获，不菑畲，则利有攸往。象曰：不耕获，未富也。","三爻":"六三：无妄之灾。或系之牛，行人之得，邑人之灾。象曰：行人得牛，邑人灾也。","四爻":"九四：可贞，无咎。象曰：可贞无咎，固有之也。","五爻":"九五：无妄之疾，勿药有喜。象曰：无妄之药，不可试也。","六爻":"上九：无妄，行有眚，无攸利。象曰：无妄之行，穷之灾也。"},"山天大畜":{"卦辞":"大畜：利贞，不家食吉，利涉大川。","彖曰":"大畜，刚健笃实，辉光日新，其德刚上而尚贤。能止健，大正也。不家食吉，养贤也。利涉大川，应乎天也。","象曰":"天在山中，大畜。君子以多识前言往行，以畜其德。","初爻":"初九：有厉，利已。象曰：有厉利已，不犯灾也。","二爻":"九二：舆说辐。象曰：舆说辐，中无尤也。","三爻":"九三：良马逐，利艰贞。曰闲舆卫，利有攸往。象曰：利有攸往，上合志也。","四爻":"六四：童牛之牿，元吉。象曰：六四元吉，有喜也。","五爻":"六五：豶豕之牙，吉。象曰：六五之吉，有庆也。","六爻":"上九：何天之衢，亨。象曰：何天之衢，道大行也。"},"山雷颐":{"卦辞":"颐：贞吉。观颐，自求口实。","彖曰":"颐，贞吉，养正则吉也。观颐，观其所养也。自求口实，观其自养也。天地养万物，圣人养贤以及万民，颐之时义大矣哉。","象曰":"山下有雷，颐。君子以慎言语，节饮食。","初爻":"初九：舍尔灵龟，观我朵颐，凶。象曰：观我朵颐，亦不足贵也。","二爻":"六二：颠颐，拂经，于丘颐，征凶。象曰：六二征凶，行失类也。","三爻":"六三：拂颐，贞凶。十年勿用，无攸利。象曰：十年勿用，道大悖也。","四爻":"六四：颠颐，吉。虎视眈眈，其欲逐逐，无咎。象曰：颠颐之吉，上施光也。","五爻":"六五：拂经，居贞吉，不可涉大川。象曰：居贞之吉，顺以从上也。","六爻":"上九：由颐，厉吉。利涉大川。象曰：由颐厉吉，大有庆也。"},"泽风大过":{"卦辞":"大过：栋桡，利有攸往，亨。","彖曰":"大过，大者过也。栋桡，本末弱也。刚过而中，巽而说行，利有攸往，乃亨。大过之时义大矣哉。","象曰":"泽灭木，大过。君子以独立不惧，遯世无闷。","初爻":"初六：藉用白茅，无咎。象曰：藉用白茅，柔在下也。","二爻":"九二：枯杨生稊，老夫得其女妻，无不利。象曰：老夫女妻，过以相与也。","三爻":"九三：栋桡，凶。象曰：栋桡之凶，不可以有辅也。","四爻":"九四：栋隆，吉。它吝。象曰：栋隆之吉，不桡乎下也。","五爻":"九五：枯杨生华，老妇得士夫，无咎无誉。象曰：枯杨生华，何可久也？老妇士夫，亦可丑也。","六爻":"上六：过涉灭顶，凶，无咎。象曰：过涉之凶，不可咎也。"},"坎为水":{"卦辞":"坎：习坎，有孚。维心亨。行有尚。","彖曰":"习坎，重险也。水流而不盈，行险而不失其信。维心亨，乃以刚中也。行有尚，往有功也。天险，不可升也；地险，山川丘陵也。王公设险以守其国。险之时用大矣哉！","象曰":"水洊至，习坎。君子以常德行，习教事。","初爻":"初六：习坎，入于坎窞，凶。象曰：习坎入坎，失道凶也。","二爻":"九二：坎有险，求小得。象曰：求小得，未出中也。","三爻":"六三：来之坎坎，险且枕，入于坎窞，勿用。象曰：来之坎坎，终无功也。","四爻":"六四：樽酒簋贰，用缶，纳约自牖，终无咎。象曰：樽酒簋贰，刚柔际也。","五爻":"九五：坎不盈，祗既平，无咎。象曰：坎不盈，中未大也。","六爻":"上六：系用徽繹，置于丛棘，三岁不得，凶。象曰：上六失道，凶三岁也。"},"离为火":{"卦辞":"离：利贞，亨。畜牝牛，吉。","彖曰":"离，丽也。日月丽乎天，百谷草木丽乎土。重明以丽乎正，乃化成天下。柔丽乎中正，故亨，是以畜牝牛吉也。","象曰":"明两作，离。大人以继明照于四方。","初爻":"初九：履错然，敬之无咎。象曰：履错之敬，以辟咎也。","二爻":"六二：黄离，元吉。象曰：黄离元吉，得中道也。","三爻":"九三：日昃之离，不鼓缶而歌，则大耋之嗟，凶。象曰：日昃之离，何可久也。","四爻":"九四：突如其来如，焚如，死如，弃如。象曰：突如其来如，无所容也。","五爻":"六五：出涕沱若，戚嗟若，吉。象曰：六五之吉，离王公也。","六爻":"上九：王用出征，有嘉。折首，获其匪丑，无咎。象曰：王用出征，以正邦也。"},"泽山咸":{"卦辞":"咸：亨，利贞。取女吉。","彖曰":"咸，感也。柔上而刚下，二气感应以相与。止而说，男下女。是以亨利贞，取女吉也。天地感而万物化生，圣人感人心而天下和平。观其所感，而天地万物之情可见矣。","象曰":"山上有泽，咸。君子以虚受人。","初爻":"初六：咸其拇。象曰：咸其拇，志在外也。","二爻":"六二：咸其腓，凶，居吉。象曰：虽凶居吉，顺不害也。","三爻":"九三：咸其股，执其随，往吝。象曰：咸其股，亦不处也。志在随人，所执下也。","四爻":"九四：贞吉悔亡，憧憧往来，朋从尔思。象曰：贞吉悔亡，未感害也。憧憧往来，未光大也。","五爻":"九五：咸其脢，无悔。象曰：咸其脢，志末也。","六爻":"上六：咸其辅，颊，舌。象曰：咸其辅，颊，舌，滕口说也。"},"雷风恒":{"卦辞":"恒：亨，无咎，利贞。利有攸往。","彖曰":"恒，久也。刚上而柔下。雷风相与，巽而动，刚柔皆应，恒。恒亨，无咎，利贞；久於其道也。天地之道，恒久而不已也。利有攸往，终则有始也。日月得天而能久照，四时变化而能久成，圣人久于其道而天下化成。观其所恒，而天地万物之情可见矣！","象曰":"雷风，恒。君子以立不易方。","初爻":"初六：浚恒，贞凶，无攸利。象曰：浚恒之凶，始求深也。","二爻":"九二：悔亡。象曰：九二悔亡，能久中也。","三爻":"九三：不恒其德，或承之羞，贞吝。象曰：不恒其德，无所容也。","四爻":"九四：田无禽。象曰：久非其位，安得禽也？","五爻":"六五：恒其德，贞。妇人吉，夫子凶。象曰：妇人贞吉，从一而终也。夫子制义，从妇凶也。","六爻":"上六：振恒，凶。象曰：振恒在上，大无功也。"},"天山遁":{"卦辞":"遁：亨。小利贞。","彖曰":"遁亨，遁而亨也。刚当位而应，与时行也。小利贞，浸而长也。遁之时义大矣哉。","象曰":"天下有山，遁。君子以远小人，不恶而严。","初爻":"初六：遁尾，厉。勿用有攸往。象曰：遁尾之厉，不往何灾也。","二爻":"六二：执之用黄牛之革，莫之胜说。象曰：执用黄牛，固志也。","三爻":"九三：系遁，有疾厉，畜臣妾，吉。象曰：系遁之厉，有疾惫也。畜臣妾吉，不可大事也。","四爻":"九四：好遁。君子吉，小人否。象曰：君子好遁，小人否也。","五爻":"九五：嘉遁，贞吉。象曰：嘉遁贞吉，以正志也。","六爻":"上九：肥遁，无不利。象曰：肥遁，无不利，无所疑也。"},"雷天大壮":{"卦辞":"大壮：利贞。","彖曰":"大壮，大者壮也。刚以动，故壮。大壮利贞，大者正也。正大而天地之情可见矣！","象曰":"雷在天上，大壮。君子以非礼弗履。","初爻":"初九：壮于趾，征凶，有孚。象曰：壮于趾，其孚穷也。","二爻":"九二：贞吉。象曰：九二贞吉，以中也。","三爻":"九三：小人用壮，君子用罔，贞厉。羝羊触藩，羸其角。象曰：小人用壮，君子罔也。","四爻":"九四：贞吉悔亡，藩决不羸，壮于大舆之輹。象曰：藩决不羸，尚往也。","五爻":"六五：丧羊于易，无悔。象曰：丧羊于易，位不当也。","六爻":"上六：羝羊触藩，不能退，不能遂，无攸利，艰则吉。象曰：不能退，不能遂，不祥也。艰则吉，咎不长也。"},"火地晋":{"卦辞":"晋：康侯用锡马蕃庶，昼日三接。","彖曰":"晋，进也。明出地上，顺而丽乎大明。柔进而上行，是以康侯用锡马蕃庶，昼日三接也。","象曰":"明出地上，晋。君子以自昭明德。","初爻":"初六：晋如，摧如，贞吉。罔孚，裕无咎。象曰：晋如摧如，独行正也。裕无咎，未受命也。","二爻":"六二：晋如，愁如，贞吉。受兹介福，于其王母。象曰：受兹介福，以中正也。","三爻":"六三：众允，悔亡。象曰：众允之志，上行也。","四爻":"九四：晋如硕鼠，贞厉。象曰：硕鼠贞厉，位不当也。","五爻":"六五：悔亡，失得勿恤，往吉，无不利。象曰：失得勿恤，往有庆也。","六爻":"上九：晋其角，维用伐邑。厉吉无咎，贞吝。象曰：维用伐邑，道未光也。"},"地火明夷":{"卦辞":"明夷：利艰贞。","彖曰":"明入地中，明夷。内文明而外柔顺，以蒙大难，文王以之。利艰贞，晦其明也。内难而能正其志，箕子以之。","象曰":"明入地中，明夷。君子以莅众用晦而明。","初爻":"初九：明夷于飞，垂其翼。君子于行，三日不食。有攸往，主人有言。象曰：君子于行，义不食也。","二爻":"六二：明夷，夷于左股，用拯马壮，吉。象曰：六二之吉，顺以则也。","三爻":"九三：明夷于南狩，得其大首，不可疾，贞。象曰：南狩之志，乃大得也。","四爻":"六四：入于左腹，获明夷之心，于出门庭。象曰：入于左腹，获心意也。","五爻":"六五：箕子之明夷，利贞。象曰：箕子之贞，明不可息也。","六爻":"上六：不明，晦。初登于天，后入于地。象曰：初登于天，照四国也。后入于地，失则也。"},"风火家人":{"卦辞":"家人：利女贞。","彖曰":"家人，女正位乎内，男正位乎外。男女正，天地之大义也。家人有严君焉，父母之谓也。父父，子子，兄兄，弟弟，夫夫，妇妇，而家道正，正家而天下定矣。","象曰":"风自火出，家人。君子以言有物而行有恒。","初爻":"初九：闲有家，悔亡。象曰：闲有家，志未变也。","二爻":"六二：无攸遂，在中馈。贞吉。象曰：六二之吉，顺以巽也。","三爻":"九三：家人嗃嗃，悔厉吉；妇子嘻嘻，终吝。象曰：家人嗃嗃，未失也。妇子嘻嘻，失家节也。","四爻":"六四：富家，大吉。象曰：富家大吉，顺在位也。","五爻":"九五：王假有家，勿恤，吉。象曰：王假有家，交相爱也。","六爻":"上九：有孚威如，终吉。象曰：威如之吉，反身之谓也。"},"火泽睽":{"卦辞":"睽：小事吉。","彖曰":"睽，火动而上，泽动而下。二女同居，其志不同行；说而丽乎明，柔进而上行，得中而应乎刚。是以小事吉。天地睽而其事同也，男女睽而其志通也，万物睽而其事类也。睽之时用大矣哉！","象曰":"上火下泽，睽。君子以同而异。","初爻":"初九：悔亡，丧马勿逐，自复。见恶人，无咎。象曰：见恶人，以辟咎也。","二爻":"九二：遇主于巷，无咎。象曰：遇主于巷，未失道也。","三爻":"六三：见舆曳，其牛掣，其人天且劓，无初有终。象曰：见舆曳，位不当也。无初有终，遇刚也。","四爻":"九四：睽孤，遇元夫。交孚，厉无咎。象曰：交孚无咎，志行也。","五爻":"六五：悔亡，厥宗噬肤，往何咎？象曰：厥宗噬肤，往有庆也。","六爻":"上九：睽孤，见豕负涂，载鬼一车。先张之弧，后说之弧。匪寇婚媾，往遇雨则吉。象曰：遇雨之吉，群疑亡也。"},"水山蹇":{"卦辞":"蹇：利西南，不利东北。利见大人，贞吉。","彖曰":"蹇，难也，险在前也。见险而能止，知矣哉。蹇利西南，往得中也。不利东北，其道穷也。利见大人，往有功也。当位贞吉，以正邦也。蹇之时用大矣哉。","象曰":"山上有水，蹇。君子以反身修德。","初爻":"初六：往蹇来誉。象曰：往蹇来誉，宜待也。","二爻":"六二：王臣蹇蹇，匪躬之故。象曰：王臣蹇蹇，终无尤也。","三爻":"九三：往蹇来反。象曰：往蹇来反，内喜之也。","四爻":"六四：往蹇来连。象曰：往蹇来连，当位实也。","五爻":"九五：大蹇，朋来。象曰：大蹇朋来，以中节也。","六爻":"上六：往蹇来硕，吉。利见大人。象曰：往蹇来硕，志在内也。利见大人，以从贵也。"},"雷水解":{"卦辞":"解：利西南，无所往，其来复吉。有攸往，夙吉。","彖曰":"解，险以动，动而免乎险，解。解利西南，往得众也。其来复吉，乃得中也。有攸往，夙吉，往有功也。天地解而雷雨作，雷雨作而百果草木皆甲坼。解之时义大矣哉。","象曰":"雷雨作，解。君子以赦过宥罪。","初爻":"初六：无咎。象曰：刚柔之际，义无咎也。","二爻":"九二：田获三狐，得黄矢，贞吉。象曰：九二贞吉，得中道也。","三爻":"六三：负且乘，致寇至，贞吝。象曰：负且乘，亦可丑也。自我致戎，又谁咎也。","四爻":"九四：解而拇，朋至斯孚。象曰：解而拇，未当位也。","五爻":"六五：君子维有解，吉，有孚于小人。象曰：君子有解，小人退也。","六爻":"上六：公用射隼于高墉之上，获之无不利。象曰：公用射隼，以解悖也。"},"山泽损":{"卦辞":"损：有孚，元吉，无咎，可贞。利有攸往。曷之用？二簋可用享。","彖曰":"损，损下益上，其道上行。损而有孚，元吉，无咎，可贞。利有攸往，曷之用？二簋可用享。二簋应有时，损刚益柔有时。损益盈虚，与时偕行。","象曰":"山下有泽，损。君子以惩忿窒欲。","初爻":"初九：已事遄往，无咎。酌损之。象曰：已事遄往，尚合志也。","二爻":"九二：利贞，征凶。弗损，益之。象曰：九二利贞，中以为志也。","三爻":"六三：三人行则损一人，一人行则得其友。象曰：一人行，三则疑也。","四爻":"六四：损其疾，使遄有喜，无咎。象曰：损其疾，亦可喜也。","五爻":"六五：或益之十朋之龟，弗克违。元吉。象曰：六五元吉，自上佑也。","六爻":"上九：弗损，益之，无咎，贞吉，利有攸往，得臣无家。象曰：弗损益之，大得志也。"},"风雷益":{"卦辞":"益：利有攸往，利涉大川。","彖曰":"益，损上益下，民说无疆。自上下下，其道大光。利有攸往，中正有庆。利涉大川，木道乃行。益动而巽，日进无疆。天施地生，其益无方。凡益之道，与时偕行。","象曰":"风雷，益。君子以见善则迁，有过则改。","初爻":"初九：利用为大作，元吉，无咎。象曰：元吉无咎，下不厚事也。","二爻":"六二：或益之十朋之龟，弗克违。永贞吉。王用享于帝，吉。象曰：或益之，自外来也。","三爻":"六三：益之用凶事，无咎。有孚中行，告公用圭。象曰：益用凶事，固有之也。","四爻":"六四：中行，告公从，利用为依迁国。象曰：告公从，以益志也。","五爻":"九五：有孚惠心，勿问元吉。有孚惠我德。象曰：有孚惠心，勿问之矣。惠我德，大得志也。","六爻":"上九：莫益之，或击之，立心勿恒，凶。象曰：莫益之，偏辞也。或击之，自外来也。"},"泽天夬":{"卦辞":"夬：扬于王庭。孚号有厉。告自邑，不利即戎，利有攸往。","彖曰":"夬，决也，刚决柔也。健而说，决而和。扬于王庭，柔乘五刚也。孚号有厉，其危乃光也。告自邑，不利即戎，所尚乃穷也。利有攸往，刚长乃终也。","象曰":"泽上于天，夬。君子以施禄及下，居德则忌。","初爻":"初九：壮于前趾，往不胜为吝。象曰：不胜而往，咎也。","二爻":"九二：惕号，莫夜有戎，勿恤。象曰：有戎勿恤，得中道也。","三爻":"九三：壮于頄，有凶。君子夬夬独行，遇雨若濡，有愠无咎。象曰：君子夬夬，终无咎也。","四爻":"九四：臀无肤，其行次且。牵羊悔亡，闻言不信。象曰：其行次且，位不当也。闻言不信，聪不明也。","五爻":"九五：苋陆夬夬，中行无咎。象曰：中行无咎，中未光也。","六爻":"上六：无号，终有凶。象曰：无号之凶，终不可长也。"},"天风姤":{"卦辞":"姤：女壮，勿用取女。","彖曰":"姤，遇也，柔遇刚也。勿用取女，不可与长也。天地相遇，品物咸章也。刚遇中正，天下大行也。姤之时义大矣哉！","象曰":"天下有风，姤；后以施命诰四方。","初爻":"初六：系于金柅，贞吉。有攸往，见凶，羸豕踟躅。象曰：系于金柅，柔道牵也。","二爻":"九二：包有鱼，无咎，不利宾。象曰：包有鱼，义不及宾也。","三爻":"九三：臀无肤，其行次且，厉，无大咎。象曰：其行次且，行未牵也。","四爻":"九四：包无鱼，起凶。象曰：无鱼之凶，远民也。","五爻":"九五：以杞包瓜，含章，有陨自天。象曰：九五含章，中正也。有陨自天，志不舍命也。","六爻":"上九：姤其角，吝，无咎。象曰：姤其角，上穷吝也。"},"泽地萃":{"卦辞":"萃：亨。王假有庙。利见大人，亨，利贞。用大牲吉，利有攸往。","彖曰":"萃，聚也。顺以说，刚中而应，故聚也。王假有庙，致孝享也。利见大人亨，聚以正也。用大牲吉，利有攸往，顺天命也。观其所聚，而天地万物之情可见矣。","象曰":"泽上于地，萃。君子以除戎器，戒不虞。","初爻":"初六：有孚不终，乃乱乃萃。若号，一握为笑。勿恤，往无咎。象曰：乃乱乃萃，其志乱也。","二爻":"六二：引吉，无咎，孚乃利用禴。象曰：引吉无咎，中未变也。","三爻":"六三：萃如，嗟如，无攸利。往无咎，小吝。象曰：往无咎，上巽也。","四爻":"九四：大吉，无咎。象曰：大吉无咎，位不当也。","五爻":"九五：萃有位，无咎。匪孚，元永贞，悔亡。象曰：萃有位，志未光也。","六爻":"上六：赍咨涕洟，无咎。象曰：赍咨涕洟，未安上也。"},"地风升":{"卦辞":"升：元亨，用见大人，勿恤，南征吉。","彖曰":"柔以时升，巽而顺，刚中而应，是以大亨。用见大人，勿恤，有庆也。南征吉，志行也。","象曰":"地中生木，升。君子以顺德，积小以高大。","初爻":"初六：允升，大吉。象曰：允升大吉，上合志也。","二爻":"九二：孚乃利用禴，无咎。象曰：九二之孚，有喜也。","三爻":"九三：升虚邑。象曰：升虚邑，无所疑也。","四爻":"六四：王用亨于岐山，吉，无咎。象曰：王用亨于岐山，顺事也。","五爻":"六五：贞吉，升阶。象曰：贞吉升阶，大得志也。","六爻":"上六：冥升，利于不息之贞。象曰：冥升在上，消不富也。"},"泽水困":{"卦辞":"困：亨，贞，大人吉，无咎。有言不信。","彖曰":"困，刚掩也。险以说，困而不失其所，亨，其唯君子乎。贞，大人吉，以刚中也。有言不信，尚口乃穷也。","象曰":"泽无水，困。君子以致命遂志。","初爻":"初六：臀困于株木，入于幽谷，三岁不觌。象曰：入于幽谷，幽不明也。","二爻":"九二：困于酒食，朱绂方来，利用亨祀。征凶，无咎。象曰：困于酒食，中有庆也。","三爻":"六三：困于石，据于蒺藜，入于其宫，不见其妻，凶。象曰：据于蒺藜，乘刚也。入于其宫，不见其妻，不祥也。","四爻":"九四：来徐徐，困于金车，吝，有终。象曰：来徐徐，志在下也。虽不当位，有与也。","五爻":"九五：劓刖，困于赤绂，乃徐有说，利用祭祀。象曰：劓刖，志未得也。乃徐有说，以中直也。利用祭祀，受福也。","六爻":"上六：困于葛藟，于臲卼，曰动悔。有悔，征吉。象曰：困于葛藟，未当也。动悔有悔，吉行也。"},"水风井":{"卦辞":"井：改邑不改井，无丧无得。往来井井。汔至亦未繘井，羸其瓶，凶。","彖曰":"巽乎水而上水，井。井养而不穷也。改邑不改井，乃以刚中也。汔至亦未繘井，未有功也。羸其瓶，是以凶也。","象曰":"木上有水，井。君子以劳民劝相。","初爻":"初六：井泥不食，旧井无禽。象曰：井泥不食，下也。旧井无禽，时舍也。","二爻":"九二：井谷射鲋，瓮敝漏。象曰：井谷射鲋，无与也。","三爻":"九三：井渫不食，为我心恻。可用汲，王明，并受其福。象曰：井渫不食，行恻也。求王明，受福也。","四爻":"六四：井甃，无咎。象曰：井甃无咎，修井也。","五爻":"九五：井冽寒泉，食。象曰：寒泉之食，中正也。","六爻":"上六：井收勿幕，有孚元吉。象曰：元吉在上，大成也。"},"泽火革":{"卦辞":"革：己日乃孚。元亨利贞。悔亡。","彖曰":"革，水火相息，二女同居，其志不相得，曰革。己日乃孚，革而信之。文明以说，大亨以正。革而当，其悔乃亡。天地革而四时成，汤武革命，顺乎天而应乎人，革之时义大矣哉。","象曰":"泽中有火，革。君子以治历明时。","初爻":"初九：巩用黄牛之革。象曰：巩用黄牛，不可以有为也。","二爻":"六二：己日乃革之，征吉，无咎。象曰：己日革之，行有嘉也。","三爻":"九三：征凶贞厉。革言三就，有孚。象曰：革言三就，又何之矣。","四爻":"九四：悔亡，有孚，改命，吉。象曰：改命之吉，信志也。","五爻":"九五：大人虎变，未占有孚。象曰：大人虎变，其文炳也。","六爻":"上六：君子豹变，小人革面，征凶，居贞吉。象曰：君子豹变，其文蔚也。小人革面，顺以从君也。"},"火风鼎":{"卦辞":"鼎：元吉，亨。","彖曰":"鼎，象也。以木巽火，亨饪也。圣人亨以享上帝，而大亨以养圣贤。巽而耳目聪明，柔进而上行，得中而应乎刚，是以元亨。","象曰":"木上有火，鼎。君子以正位凝命。","初爻":"初六：鼎颠趾，利出否。得妾以其子，无咎。象曰：鼎颠趾，未悖也。利出否，以从贵也。","二爻":"九二：鼎有实，我仇有疾，不我能即，吉。象曰：鼎有实，慎所之也。我仇有疾，终无尤也。","三爻":"九三：鼎耳革，其行塞，雉膏不食。方雨，亏悔，终吉。象曰：鼎耳革，失其义也。","四爻":"九四：鼎折足，覆公餗，其形渥，凶。象曰：覆公餗，信如何也？","五爻":"六五：鼎黄耳金铉，利贞。象曰：鼎黄耳，中以为实也。","六爻":"上九：鼎玉铉，大吉，无不利。象曰：玉铉在上，刚柔节也。"},"震为雷":{"卦辞":"震：亨。震来虩虩，笑言哑哑。震惊百里，不丧匕鬯。","彖曰":"震，亨。震来虩虩，恐致福也。笑言哑哑，后有则也。震惊百里，惊远而惧迩也。出可以守宗庙社稷，以为祭主也。","象曰":"洊雷，震。君子以恐惧修身。","初爻":"初九：震来虩虩，后笑言哑哑，吉。象曰：震来虩虩，恐致福也。笑言哑哑，后有则也。","二爻":"六二：震来厉，亿丧贝，跻于九陵，勿逐，七日得。象曰：震来厉，乘刚也。","三爻":"六三：震苏苏，震行无眚。象曰：震苏苏，位不当也。","四爻":"九四：震遂泥。象曰：震遂泥，未光也。","五爻":"六五：震往来厉，亿无丧，有事。象曰：震往来厉，危行也。其事在中，大无丧也。","六爻":"上六：震索索，视矍矍，征凶。震不于其躬，于其邻，无咎。婚媾有言。象曰：震索索，未得中也。虽凶无咎，畏邻戒也。"},"艮为山":{"卦辞":"艮：艮其背，不获其身，行其庭，不见其人，无咎。","彖曰":"艮，止也。时止则止，时行则行，动静不失其时，其道光明。艮其止，止其所也。上下敌应，不相与也，是以不获其身。行其庭不见其人，无咎也。","象曰":"兼山，艮；君子以思不出其位。","初爻":"初六：艮其趾，无咎。利永贞。象曰：艮其趾，未失正也。","二爻":"六二：艮其腓，不拯其随，其心不快。象曰：不拯其随，未退听也。","三爻":"九三：艮其限，列其夤，厉薰心。象曰：艮其限，危薰心也。","四爻":"六四：艮其身，无咎。象曰：艮其身，止诸躬也。","五爻":"六五：艮其辅，言有序，悔亡。象曰：艮其辅，以中正也。","六爻":"上九：敦艮，吉。象曰：敦艮之吉，以厚终也。"},"风山渐":{"卦辞":"渐：女归吉，利贞。","彖曰":"渐之进也，女归吉也。进得位，往有功也。进以正，可以正邦也。其位刚得中也。止而巽，动不穷也。","象曰":"山上有木，渐。君子以居贤德善俗。","初爻":"初六：鸿渐于干，小子厉，有言，无咎。象曰：小子之厉，义无咎也。","二爻":"六二：鸿渐于磐，饮食衍衍，吉。象曰：饮食衍衍，不素饱也。","三爻":"九三：鸿渐于陆。夫征不复，妇孕不育，凶。利御寇。象曰：夫征不复，离群丑也。妇孕不育，失其道也。利用御寇，顺相保也。","四爻":"六四：鸿渐于木，或得其桷，无咎。象曰：或得其桷，顺以巽也。","五爻":"九五：鸿渐于陵，妇三岁不孕，终莫之胜，吉。象曰：终莫之胜，吉，得所愿也。","六爻":"上九：鸿渐于逵，其羽可用为仪，吉。象曰：其羽可用为仪吉，不可乱也。"},"雷泽归妹":{"卦辞":"归妹：征凶，无攸利。","彖曰":"归妹，天地之大义也。天地不交而万物不兴。归妹，人之终始也。说以动，所归妹也。征凶，位不当也。无攸利，柔乘刚也。","象曰":"泽上有雷，归妹。君子以永终知敝。","初爻":"初九：归妹以娣，跛能履，征吉。象曰：归妹以娣，以恒也。跛能履，吉相承也。","二爻":"九二：眇能视，利幽人之贞。象曰：利幽人之贞，未变常也。","三爻":"六三：归妹以须，反归以娣。象曰：归妹以须，未当也。","四爻":"九四：归妹愆期，迟归有时。象曰：愆期之志，有待而行也。","五爻":"六五：帝乙归妹，其君之袂不如其娣之袂良，月几望，吉。象曰：帝乙归妹，不如其娣之袂良也。其位在中，以贵行也。","六爻":"上六：女承筐无实，士刲羊无血，无攸利。象曰：上六无实，承虚筐也。"},"雷火丰":{"卦辞":"丰：亨。王假之，勿忧，宜日中。","彖曰":"丰，大也。明以动，故丰。王假之，尚大也。勿忧，宜日中，宜照天下也。日中则昃，月盈则食。天地盈虚，与时消息，而况于人乎？况于鬼神乎？","象曰":"雷电皆至，丰。君子以折狱致刑。","初爻":"初九：遇其配主，虽旬无咎，往有尚。象曰：虽旬无咎，过旬灾也。","二爻":"六二：丰其蔀，日中见斗。往得疑疾，有孚发若，吉。象曰：有孚发若，信以发志也。","三爻":"九三：丰其沛，日中见昧，折其右肱，无咎。象曰：丰其沛，不可大事也。折其右肱，终不可用也。","四爻":"九四：丰其蔀，日中见斗，遇其夷主，吉。象曰：丰其蔀，位不当也。日中见斗，幽不明也。遇其夷主，吉行也。","五爻":"六五：来章，有庆誉，吉。象曰：六五之吉，有庆也。","六爻":"上六：丰其屋，蔀其家，窥其户，阒其无人，三岁不觌，凶。象曰：丰其屋，天际翔也。窥其户，阒其无人，自藏也。"},"火山旅":{"卦辞":"旅：小亨，旅贞吉。","彖曰":"旅，小亨。柔得中乎外，而顺乎刚，止而丽乎明，是以小亨，旅贞吉也。旅之时义大矣哉！","象曰":"山上有火，旅。君子以明慎用刑而不留狱。","初爻":"初六：旅琐琐，斯其所取灾。象曰：旅琐琐，志穷灾也。","二爻":"六二：旅即次，怀其资，得童仆，贞。象曰：得童仆贞，终无尤也。","三爻":"九三：旅焚其次，丧其童仆，贞厉。象曰：旅焚其次，亦以伤矣。以旅与下，其义丧也。","四爻":"九四：旅于处，得其资斧，我心不快。象曰：旅于处，未得位也。得其资斧，心未快也。","五爻":"六五：射雉，一矢亡，终以誉命。象曰：终以誉命，上逮也。","六爻":"上九：鸟焚其巢，旅人先笑后号咷。丧牛于易，凶。象曰：以旅在上，其义焚也。丧牛于易，终莫之闻也。"},"巽为风":{"卦辞":"巽：小亨。利有攸往，利见大人。","彖曰":"重巽以申命。刚巽乎中正而志行。柔皆顺乎刚，是以小亨，利有攸往，利见大人。","象曰":"随风，巽。君子以申命行事。","初爻":"初六：进退，利武人之贞。象曰：进退，志疑也。利武人之贞，志治也。","二爻":"九二：巽在床下，用史巫纷若，吉，无咎。象曰：纷若之吉，得中也。","三爻":"九三：频巽，吝。象曰：频巽之吝，志穷也。","四爻":"六四：悔亡，田获三品。象曰：田获三品，有功也。","五爻":"九五：贞吉，悔亡，无不利。无初有终。先庚三日，后庚三日，吉。象曰：九五之吉，位正中也。","六爻":"上九：巽在床下，丧其资斧，贞凶。象曰：巽在床下，上穷也。丧其资斧，正乎凶也。"},"兑为泽":{"卦辞":"兑：亨，利贞。","彖曰":"兑，说也。刚中而柔外，说以利贞，是以顺乎天而应乎人。说以先民，民忘其劳。说以犯难，民忘其死。说之大，民劝矣哉。","象曰":"丽泽，兑。君子以朋友讲习。","初爻":"初九：和兑，吉。象曰：和兑之吉，行未疑也。","二爻":"九二：孚兑，吉，悔亡。象曰：孚兑之吉，信志也。","三爻":"六三：来兑，凶。象曰：来兑之凶，位不当也。","四爻":"九四：商兑未宁，介疾有喜。象曰：九四之喜，有庆也。","五爻":"九五：孚于剥，有厉。象曰：孚于剥，位正当也。","六爻":"上六：引兑。象曰：上六引兑，未光也。"},"风水涣":{"卦辞":"涣：亨。王假有庙。利涉大川，利贞。","彖曰":"涣，亨。刚来而不穷，柔得位乎外而上同。王假有庙，王乃在中也。利涉大川，乘木有功也。","象曰":"风行水上，涣。先王以享于帝，立庙。","初爻":"初六：用拯马壮，吉。象曰：初六之吉，顺也。","二爻":"九二：涣奔其机，悔亡。象曰：涣奔其机，得愿也。","三爻":"六三：涣其躬，无悔。象曰：涣其躬，志在外也。","四爻":"六四：涣其群，元吉。涣有丘，匪夷所思。象曰：涣其群，元吉，光大也。","五爻":"九五：涣汗，其大号涣，王居，无咎。象曰：王居无咎，正位也。","六爻":"上九：涣其血，去逖出，无咎。象曰：涣其血，远害也。"},"水泽节":{"卦辞":"节：亨。苦节不可贞。","彖曰":"节，亨。刚柔分而刚得中。苦节不可贞，其道穷也。说以行险，当位以节，中正以通。天地节而四时成。节以制度，不伤财，不害民。","象曰":"泽上有水，节。君子以制数度，议德行。","初爻":"初九：不出户庭，无咎。象曰：不出户庭，知通塞也。","二爻":"九二：不出门庭，凶。象曰：不出门庭凶，失时极也。","三爻":"六三：不节若，则嗟若，无咎。象曰：不节之嗟，又谁咎也？","四爻":"六四：安节，亨。象曰：安节之亨，承上道也。","五爻":"九五：甘节，吉，往有尚。象曰：甘节之吉，居位中也。","六爻":"上六：苦节，贞凶，悔亡。象曰：苦节贞凶，其道穷也。"},"风泽中孚":{"卦辞":"中孚：豚鱼，吉，利涉大川，利贞。","彖曰":"中孚，柔在内而刚得中。说而巽，孚乃化邦也。豚鱼吉，信及豚鱼也。利涉大川，乘木舟虚也。中孚以利贞，乃应乎天也。","象曰":"泽上有风，中孚。君子以议狱缓死。","初爻":"初九：虞吉，有它不燕。象曰：初九虞吉，志未变也。","二爻":"九二：鸣鹤在阴，其子和之。我有好爵，吾与尔靡之。象曰：其子和之，中心愿也。","三爻":"六三：得敌，或鼓或罢，或泣或歌。象曰：可鼓或罢，位不当也。","四爻":"六四：月几望，马匹亡，无咎。象曰：马匹亡，绝类上也。","五爻":"九五：有孚挛如，无咎。象曰：有孚挛如，位正当也。","六爻":"上九：翰音登于天，贞凶。象曰：翰音登于天，何可长也。"},"雷山小过":{"卦辞":"小过：亨，利贞。可小事，不可大事。飞鸟遗之音。不宜上，宜下，大吉。","彖曰":"小过，小者过而亨也。过以利贞，与时行也。柔得中，是以小事吉也。刚失位而不中，是以不可大事也。有飞鸟之象焉，有飞鸟遗之音。不宜上，宜下，大吉，上逆而下顺也。","象曰":"山上有雷，小过；君子以行过乎恭，丧过乎哀，用过乎俭。","初爻":"初六：飞鸟以凶。象曰：飞鸟以凶，不可如何也。","二爻":"六二：过其祖，遇其妣。不及其君，遇其臣。无咎。象曰：不及其君，臣不可过也。","三爻":"九三：弗过防之，从或戕之，凶。象曰：从或戕之，凶如何也。","四爻":"九四：无咎。弗过遇之，往厉必戒，勿用永贞。象曰：弗过遇之，位不当也。往厉必戒，终不可长也。","五爻":"六五：密云不雨，自我西郊。公弋取彼在穴。象曰：密云不雨，已上也。","六爻":"上六：弗遇过之，飞鸟离之，凶，是谓灾眚。象曰：弗遇过之，已亢也。"},"水火既济":{"卦辞":"既济：亨小，利贞。初吉终乱。","彖曰":"既济亨，小者亨也。利贞，刚柔正而位当也。初吉，柔得中也。终止则乱，其道穷也。","象曰":"水在火上，既济。君子以思患而预防之。","初爻":"初九：曳其轮，濡其尾，无咎。象曰：曳其轮，义无咎也。","二爻":"六二：妇丧其茀，勿逐，七日得。象曰：七日得，以中道也。","三爻":"九三：高宗伐鬼方，三年克之，小人勿用。象曰：三年克之，惫也。","四爻":"六四：繻有衣袽，终日戒。象曰：终日戒，有所疑也。","五爻":"九五：东邻杀牛，不如西邻之禴祭，实受其福。象曰：东邻杀牛，不如西邻之时也。实受其福，吉大来也。","六爻":"上六：濡其首，厉。象曰：濡其首厉，何可久也。"},"火水未济":{"卦辞":"未济：亨。小狐汔济，濡其尾，无攸利。","彖曰":"未济，亨；柔得中也。小狐汔济，未出中也。濡其尾，无攸利；不续终也。虽不当位，刚柔应也。","象曰":"火在水上，未济。君子以慎辨物居方。","初爻":"初六：濡其尾，吝。象曰：濡其尾，亦不知极也。","二爻":"九二：曳其轮，贞吉。象曰：九二贞吉，中以行正也。","三爻":"六三：未济，征凶，利涉大川。象曰：未济征凶，位不当也。","四爻":"九四：贞吉，悔亡，震用伐鬼方。三年有赏于大国。象曰：贞吉悔亡，志行也。","五爻":"六五：贞吉，无悔。君子之光，有孚，吉。象曰：君子之光，其晖吉也。","六爻":"上九：有孚于饮酒，无咎。濡其首，有孚失是。象曰：饮酒濡首，亦不知节也。"}};function getGuaci(guaName){return GUACI_DATA[guaName]||{};}
return{getGuaci:getGuaci,};})();;let liuyaoShensha=(()=>{'use strict';const SANHE_DICT={'申':{'首':'申','中':'子','尾':'辰'},'子':{'首':'申','中':'子','尾':'辰'},'辰':{'首':'申','中':'子','尾':'辰'},'亥':{'首':'亥','中':'卯','尾':'未'},'卯':{'首':'亥','中':'卯','尾':'未'},'未':{'首':'亥','中':'卯','尾':'未'},'寅':{'首':'寅','中':'午','尾':'戌'},'午':{'首':'寅','中':'午','尾':'戌'},'戌':{'首':'寅','中':'午','尾':'戌'},'巳':{'首':'巳','中':'酉','尾':'丑'},'酉':{'首':'巳','中':'酉','尾':'丑'},'丑':{'首':'巳','中':'酉','尾':'丑'},};const CHONG_MAP={'子':'午','午':'子','丑':'未','未':'丑','寅':'申','申':'寅','卯':'酉','酉':'卯','辰':'戌','戌':'辰','巳':'亥','亥':'巳',};const ZHI_ORDER=['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];const YIMA_MAP={'子':'寅','丑':'亥','寅':'申','卯':'巳','辰':'寅','巳':'亥','午':'申','未':'巳','申':'寅','酉':'亥','戌':'申','亥':'巳',};const GUIREN_MAP={'甲':['丑','未'],'乙':['子','申'],'丙':['亥','酉'],'丁':['亥','酉'],'戊':['丑','未'],'己':['子','申'],'庚':['午','寅'],'辛':['午','寅'],'壬':['卯','巳'],'癸':['卯','巳'],};const LUSHEN_MAP={'甲':'寅','乙':'卯','丙':'巳','丁':'午','戊':'巳','己':'午','庚':'申','辛':'酉','壬':'亥','癸':'子',};const YANGREN_MAP={'寅':'卯','卯':'寅','巳':'午','午':'巳','申':'酉','酉':'申','亥':'子','子':'亥',};const WENCHANG_MAP={'甲':'巳','乙':'午','丙':'申','丁':'酉','戊':'申','己':'酉','庚':'亥','辛':'子','壬':'寅','癸':'卯',};const JIESHA_MAP={'申':'巳','亥':'申','寅':'亥','巳':'寅',};const JITU_MAP={'子':'丑','丑':'丑','寅':'辰','卯':'辰','辰':'辰','巳':'未','午':'未','未':'未','申':'戌','酉':'戌','戌':'戌','亥':'丑',};function getYima(dayZhi){return YIMA_MAP[dayZhi]||'';}
function getGuiren(dayGan){return GUIREN_MAP[dayGan]||[];}
function getLushen(dayGan){return LUSHEN_MAP[dayGan]||'';}
function getYangren(lushen){return YANGREN_MAP[lushen]||'';}
function getWenchang(dayGan){return WENCHANG_MAP[dayGan]||'';}
function getTaohua(dayZhi){const sanheInfo=SANHE_DICT[dayZhi]||{};const shou=sanheInfo['首']||'';if(!shou)return'';const idx=(ZHI_ORDER.indexOf(shou)+1)%12;return ZHI_ORDER[idx];}
function getJiesha(dayZhi){const sanheInfo=SANHE_DICT[dayZhi]||{};const shou=sanheInfo['首']||'';return JIESHA_MAP[shou]||'';}
function getJiangxing(dayZhi){const sanheInfo=SANHE_DICT[dayZhi]||{};return sanheInfo['中']||'';}
function getZaisha(dayZhi){const sanheInfo=SANHE_DICT[dayZhi]||{};const zhong=sanheInfo['中']||'';return CHONG_MAP[zhong]||'';}
function getMouxing(dayZhi){const sanheInfo=SANHE_DICT[dayZhi]||{};const wei=sanheInfo['尾']||'';return CHONG_MAP[wei]||'';}
function getHuagai(dayZhi){const sanheInfo=SANHE_DICT[dayZhi]||{};return sanheInfo['尾']||'';}
function getTianyi(monthZhi){const monthIdx=ZHI_ORDER.indexOf(monthZhi);if(monthIdx<0)return'';return ZHI_ORDER[(monthIdx-1+12)%12];}
function getJitu(monthZhi){return JITU_MAP[monthZhi]||'';}
function getTianxi(monthZhi){const jitu=getJitu(monthZhi);return CHONG_MAP[jitu]||'';}
function getShensha(dayGan,dayZhi,monthZhi){const result={};result['驿马']=getYima(dayZhi);result['贵人']=getGuiren(dayGan);const lushen=getLushen(dayGan);result['禄神']=lushen;result['羊刃']=getYangren(lushen);result['文昌']=getWenchang(dayGan);result['桃花']=getTaohua(dayZhi);result['劫煞']=getJiesha(dayZhi);result['将星']=getJiangxing(dayZhi);result['灾煞']=getZaisha(dayZhi);result['谋星']=getMouxing(dayZhi);result['华盖']=getHuagai(dayZhi);result['天医']=getTianyi(monthZhi);result['天喜']=getTianxi(monthZhi);return result;}
return{getShensha:getShensha,};})();;let liuyaoAlgorithm=(()=>{'use strict';function checkDependencies(){if(typeof liuyaoGuaciData==='undefined'){console.error('缺少依赖模块: liuyaoGuaciData，请确保已加载 liuyao_guaci_data.js');return false;}
if(typeof liuyaoShensha==='undefined'){console.error('缺少依赖模块: liuyaoShensha，请确保已加载 liuyao_shensha.js');return false;}
return true;}
const YAO_NAMES=['初爻','二爻','三爻','四爻','五爻','六爻'];const BAGUA_CODES=['111','110','101','100','011','010','001','000'];const NAJIA=[['甲子寅辰','壬午申戌'],['丁巳卯丑','丁亥酉未'],['己卯丑亥','己酉未巳'],['庚子寅辰','庚午申戌'],['辛丑亥酉','辛未巳卯'],['戊寅辰午','戊申戌子'],['丙辰午申','丙戌子寅'],['乙未巳卯','癸丑亥酉'],];const GUAMING={'111111':'乾为天','011111':'天风姤','001111':'天山遁','000111':'天地否','000011':'风地观','000001':'山地剥','000101':'火地晋','111101':'火天大有','110110':'兑为泽','010110':'泽水困','000110':'泽地萃','001110':'泽山咸','001010':'水山蹇','001000':'地山谦','001100':'雷山小过','110100':'雷泽归妹','101101':'离为火','001101':'火山旅','011101':'火风鼎','010101':'火水未济','010001':'山水蒙','010011':'风水涣','010111':'天水讼','101111':'天火同人','100100':'震为雷','000100':'雷地豫','010100':'雷水解','011100':'雷风恒','011000':'地风升','011010':'水风井','011110':'泽风大过','100110':'泽雷随','011011':'巽为风','111011':'风天小畜','101011':'风火家人','100011':'风雷益','100111':'天雷无妄','100101':'火雷噬嗑','100001':'山雷颐','011001':'山风蛊','010010':'坎为水','110010':'水泽节','100010':'水雷屯','101010':'水火既济','101110':'泽火革','101100':'雷火丰','101000':'地火明夷','010000':'地水师','001001':'艮为山','101001':'山火贲','111001':'山天大畜','110001':'山泽损','110101':'火泽睽','110111':'天泽履','110011':'风泽中孚','001011':'风山渐','000000':'坤为地','100000':'地雷复','110000':'地泽临','111000':'地天泰','111100':'雷天大壮','111110':'泽天夬','111010':'水天需','000010':'水地比',};const GUAMING_TO_WUXING={'乾为天':'金','天风姤':'金','天山遁':'金','天地否':'金','风地观':'金','山地剥':'金','火地晋':'金','火天大有':'金','兑为泽':'金','泽水困':'金','泽地萃':'金','泽山咸':'金','水山蹇':'金','地山谦':'金','雷山小过':'金','雷泽归妹':'金','离为火':'火','火山旅':'火','火风鼎':'火','火水未济':'火','山水蒙':'火','风水涣':'火','天水讼':'火','天火同人':'火','震为雷':'木','雷地豫':'木','雷水解':'木','雷风恒':'木','地风升':'木','水风井':'木','泽风大过':'木','泽雷随':'木','巽为风':'木','风天小畜':'木','风火家人':'木','风雷益':'木','天雷无妄':'木','火雷噬嗑':'木','山雷颐':'木','山风蛊':'木','坎为水':'水','水泽节':'水','水雷屯':'水','水火既济':'水','泽火革':'水','雷火丰':'水','地火明夷':'水','地水师':'水','艮为山':'土','山火贲':'土','山天大畜':'土','山泽损':'土','火泽睽':'土','天泽履':'土','风泽中孚':'土','风山渐':'土','坤为地':'土','地雷复':'土','地泽临':'土','地天泰':'土','雷天大壮':'土','泽天夬':'土','水天需':'土','水地比':'土',};const DIZHI_WUXING_MAP={'子':'水','丑':'土','寅':'木','卯':'木','辰':'土','巳':'火','午':'火','未':'土','申':'金','酉':'金','戌':'土','亥':'水',};const KE_MAP={'木':'土','火':'金','土':'水','金':'木','水':'火',};const SHENG_MAP={'木':'火','火':'土','土':'金','金':'水','水':'木',};const LIU_SHEN=['青龙','朱雀','勾陈','螣蛇','白虎','玄武'];const DAYGAN_TO_LIUSHEN_START={'甲':0,'乙':0,'丙':1,'丁':1,'戊':2,'己':3,'庚':4,'辛':4,'壬':5,'癸':5,};const GONG_PARAM_MAP={'111111':[1,1,1,1,1,1],'011111':[1,1,1,1,1,1],'001111':[1,1,1,1,1,1],'000111':[1,1,1,1,1,1],'000011':[1,1,1,1,1,1],'000001':[1,1,1,1,1,1],'000101':[1,1,1,1,1,1],'111101':[1,1,1,1,1,1],'110110':[1,1,0,1,1,0],'010110':[1,1,0,1,1,0],'000110':[1,1,0,1,1,0],'001110':[1,1,0,1,1,0],'001010':[1,1,0,1,1,0],'001000':[1,1,0,1,1,0],'001100':[1,1,0,1,1,0],'110100':[1,1,0,1,1,0],'101101':[1,0,1,1,0,1],'001101':[1,0,1,1,0,1],'011101':[1,0,1,1,0,1],'010101':[1,0,1,1,0,1],'010001':[1,0,1,1,0,1],'010011':[1,0,1,1,0,1],'010111':[1,0,1,1,0,1],'101111':[1,0,1,1,0,1],'100100':[1,0,0,1,0,0],'000100':[1,0,0,1,0,0],'010100':[1,0,0,1,0,0],'011100':[1,0,0,1,0,0],'011000':[1,0,0,1,0,0],'011010':[1,0,0,1,0,0],'011110':[1,0,0,1,0,0],'100110':[1,0,0,1,0,0],'011011':[0,1,1,0,1,1],'111011':[0,1,1,0,1,1],'101011':[0,1,1,0,1,1],'100011':[0,1,1,0,1,1],'100111':[0,1,1,0,1,1],'100101':[0,1,1,0,1,1],'100001':[0,1,1,0,1,1],'011001':[0,1,1,0,1,1],'010010':[0,1,0,0,1,0],'110010':[0,1,0,0,1,0],'100010':[0,1,0,0,1,0],'101010':[0,1,0,0,1,0],'101110':[0,1,0,0,1,0],'101100':[0,1,0,0,1,0],'101000':[0,1,0,0,1,0],'010000':[0,1,0,0,1,0],'001001':[0,0,1,0,0,1],'101001':[0,0,1,0,0,1],'111001':[0,0,1,0,0,1],'110001':[0,0,1,0,0,1],'110101':[0,0,1,0,0,1],'110111':[0,0,1,0,0,1],'110011':[0,0,1,0,0,1],'001011':[0,0,1,0,0,1],'000000':[0,0,0,0,0,0],'100000':[0,0,0,0,0,0],'110000':[0,0,0,0,0,0],'111000':[0,0,0,0,0,0],'111100':[0,0,0,0,0,0],'111110':[0,0,0,0,0,0],'111010':[0,0,0,0,0,0],'000010':[0,0,0,0,0,0],};function convertParamsToMark(params){return params.map(param=>String(parseInt(param)%2)).join('');}
function convertParamsToYinyangDict(params){const yinyangMap={1:'少阳',2:'少阴',3:'老阳',4:'老阴'};const result={};params.forEach((param,i)=>{if(i<YAO_NAMES.length){result[YAO_NAMES[i]]=yinyangMap[param]||'未知';}});return result;}
function getGuaming(guaCode){return GUAMING[guaCode]||'';}
function buildGanzhiList(ganzhiStr){const tiangan=ganzhiStr[0];const dizhi=ganzhiStr.slice(1);const ganzhiList=[];for(const zhi of dizhi){ganzhiList.push(tiangan+zhi);}
return ganzhiList;}
function getNajia(guaCode){const neiGua=guaCode.slice(0,3);const waiGua=guaCode.slice(3);const innerIndex=BAGUA_CODES.indexOf(neiGua);const outerIndex=BAGUA_CODES.indexOf(waiGua);const innerGanzhi=buildGanzhiList(NAJIA[innerIndex][0]);const outerGanzhi=buildGanzhiList(NAJIA[outerIndex][1]);return innerGanzhi.concat(outerGanzhi);}
function getYaoNajia(guaCode){const najiaGanzhi=getNajia(guaCode);const result={};YAO_NAMES.forEach((name,i)=>{result[name]=najiaGanzhi[i];});return result;}
function getNajiaWuxing(guaCode){const najiaGanzhi=getNajia(guaCode);const najiaWuxing=najiaGanzhi.map(ganzhi=>{const zhi=ganzhi[1];return DIZHI_WUXING_MAP[zhi]||'';});const result={};YAO_NAMES.forEach((name,i)=>{result[name]=najiaWuxing[i];});return result;}
function getShengke(guaWuxing,dizhiWuxing){if(guaWuxing===dizhiWuxing)return'同我';if(SHENG_MAP[guaWuxing]===dizhiWuxing)return'我生';if(KE_MAP[guaWuxing]===dizhiWuxing)return'我克';if(SHENG_MAP[dizhiWuxing]===guaWuxing)return'生我';if(KE_MAP[dizhiWuxing]===guaWuxing)return'克我';return'无';}
function getLiuqin(guaWuxing,dizhiWuxing){const shengke=getShengke(guaWuxing,dizhiWuxing);const liuqinMap={'同我':'兄弟','生我':'父母','克我':'官鬼','我生':'子孙','我克':'妻财','无':'无'};return liuqinMap[shengke]||'无';}
function getYaoLiuqin(guaCode,guaWuxing){const najiaGanzhi=getNajia(guaCode);const liuqin=najiaGanzhi.map(ganzhi=>{const dizhi=ganzhi[1];const dizhiWuxing=DIZHI_WUXING_MAP[dizhi]||'';return getLiuqin(guaWuxing,dizhiWuxing);});const result={};YAO_NAMES.forEach((name,i)=>{result[name]=liuqin[i];});return result;}
function getShiPosition(wai,nei){if(wai[2]===nei[2]){if(wai[1]!==nei[1]&&wai[0]!==nei[0])return 2;}else{if(wai[1]===nei[1]&&wai[0]===nei[0])return 5;}
if(wai[1]===nei[1]){if(wai[0]!==nei[0]&&wai[2]!==nei[2])return 4;}else{if(wai[0]===nei[0]&&wai[2]===nei[2])return 3;}
if(wai[0]===nei[0]){if(wai[1]!==nei[1]&&wai[2]!==nei[2])return 4;}else{if(wai[1]===nei[1]&&wai[2]===nei[2])return 1;}
if(wai===nei)return 6;return 3;}
function getYingPosition(shi){return shi<=3?shi+3:shi-3;}
function getShiying(params){const mark=convertParamsToMark(params);const wai=mark.slice(3);const nei=mark.slice(0,3);const shi=getShiPosition(wai,nei);const ying=getYingPosition(shi);const result={};YAO_NAMES.forEach((name,i)=>{result[name]='';});if(shi>=1&&shi<=6)result[YAO_NAMES[shi-1]]='世';if(ying>=1&&ying<=6)result[YAO_NAMES[ying-1]]='应';return result;}
function getLiushen(dayGan){const startIndex=DAYGAN_TO_LIUSHEN_START[dayGan]||0;const liushen=[];for(let i=0;i<6;i++){const shenIndex=(startIndex+i)%6;liushen.push(LIU_SHEN[shenIndex]);}
return liushen;}
function getYaoLiushen(dayGan){const liushen=getLiushen(dayGan);const result={};YAO_NAMES.forEach((name,i)=>{result[name]=liushen[i];});return result;}
function hasDong(params){return params.some(param=>param>2);}
function getBianguaParam(params){return params.map(param=>{if(param===3)return 2;if(param===4)return 1;return param;});}
function hasCanggua(yaoLiuqin){const liuqinTuple=['兄弟','父母','官鬼','妻财','子孙'];const currentLiuqin=new Set(Object.values(yaoLiuqin));const requiredLiuqin=new Set(liuqinTuple);return[...requiredLiuqin].filter(qin=>!currentLiuqin.has(qin));}
function getCangguaParam(guaCode){return GONG_PARAM_MAP[guaCode]||[];}
function yaoFushen(cangguaLiuqin,missingLiuqin){const result={};for(const[key,value]of Object.entries(cangguaLiuqin)){result[key]=missingLiuqin.includes(value)?'true':'false';}
return result;}
function isDongYao(yinyang){return yinyang==='老阳'||yinyang==='老阴';}
function isTrueFlag(value){return String(value).toLowerCase()==='true';}
function formatQinNajiaWuxing(yaoData){return`${yaoData['六亲'] || '未知'}${yaoData['纳甲'] || '未知'}${yaoData['五行'] || '未知'}`;}
function formatQinWithNajiaWuxing(yaoData){return`${yaoData['六亲'] || '未知'} ${yaoData['纳甲'] || '未知'}${yaoData['五行'] || '未知'}`;}
function getShiyingSummaryLine(bengua,marker){for(let i=YAO_NAMES.length-1;i>=0;i--){const yaoName=YAO_NAMES[i];const yaoData=bengua[yaoName]||{};if(yaoData['世应']===marker){return`${yaoName} ${formatQinWithNajiaWuxing(yaoData)}`;}}
return'无';}
function getBianguaValue(biangua,benguaYao,yaoName){if(!isDongYao(benguaYao['阴阳']||'')){return'无';}
if(!biangua){return'无';}
const bianguaYao=biangua[yaoName]||{};return formatQinNajiaWuxing(bianguaYao);}
function getFushenValue(canggua,yaoName){if(!canggua){return'无';}
const cangguaYao=canggua[yaoName]||{};if(!isTrueFlag(cangguaYao['伏神'])){return'无';}
return formatQinNajiaWuxing(cangguaYao);}
function formatFushenSummary(canggua){if(!canggua){return'无';}
const items=[];for(let i=YAO_NAMES.length-1;i>=0;i--){const yaoName=YAO_NAMES[i];const cangguaYao=canggua[yaoName]||{};if(isTrueFlag(cangguaYao['伏神'])){items.push(`${yaoName} ${formatQinNajiaWuxing(cangguaYao)}`);}}
return items.length>0?items.join('；'):'无';}
function buildDongYaoSummary(bengua,biangua){const lines=[];for(let i=YAO_NAMES.length-1;i>=0;i--){const yaoName=YAO_NAMES[i];const benguaYao=bengua[yaoName]||{};if(!isDongYao(benguaYao['阴阳']||'')){continue;}
const benguaText=formatQinWithNajiaWuxing(benguaYao);const bianguaText=getBianguaValue(biangua,benguaYao,yaoName);lines.push(`${yaoName} ${benguaText} -> ${bianguaText}`);}
return lines;}
function buildCoreMarkdownTable(bengua,biangua,canggua){const lines=['| 爻位 | 六神 | 伏神 | 六亲 | 纳甲  | 阴阳 | 世应 | 动静 | 变爻 |','|----|----|----|----|-----|----|----|----|-------|',];for(let i=YAO_NAMES.length-1;i>=0;i--){const yaoName=YAO_NAMES[i];const benguaYao=bengua[yaoName]||{};lines.push(`| ${yaoName} | ${benguaYao['六神'] || '无'} | ${getFushenValue(canggua, yaoName)} | ${benguaYao['六亲'] || '未知'} | ${(benguaYao['纳甲'] || '未知') + (benguaYao['五行'] || '未知')} | ${benguaYao['阴阳'] || '未知'} | ${benguaYao['世应'] || '无'} | ${isDongYao(benguaYao['阴阳'] || '') ? '动' : '静'} | ${getBianguaValue(biangua, benguaYao, yaoName)} |`);}
return lines;}
function buildDetailedYaoMarkdown(bengua,biangua,canggua){const lines=[];for(let i=0;i<YAO_NAMES.length;i++){const yaoName=YAO_NAMES[i];const benguaYao=bengua[yaoName]||{};lines.push(`### ${yaoName}`,`- 六神：${benguaYao['六神'] || '无'}`,`- 伏神：${getFushenValue(canggua, yaoName)}`,`- 六亲：${benguaYao['六亲'] || '未知'}`,`- 纳甲：${(benguaYao['纳甲'] || '未知') + (benguaYao['五行'] || '未知')}`,`- 阴阳：${benguaYao['阴阳'] || '未知'}`,`- 世应：${benguaYao['世应'] || '无'}`,`- 动静：${isDongYao(benguaYao['阴阳'] || '') ? '动' : '静'}`,`- 变爻：${getBianguaValue(biangua, benguaYao, yaoName)}`,`- 爻辞：${benguaYao['爻辞'] || '未知'}`);if(i<YAO_NAMES.length-1){lines.push('');}}
return lines;}
function buildGuaMarkdown(sectionTitle,guaData,guaNameKey){const lines=[`## ${sectionTitle}`,`- 卦名：${guaData[guaNameKey] || '未知'}`,`- 卦辞：${guaData['卦辞'] || '未知'}`,`- 彖曰：${guaData['彖曰'] || '未知'}`,`- 象曰：${guaData['象曰'] || '未知'}`,'- 爻辞：',];for(let i=YAO_NAMES.length-1;i>=0;i--){const yaoName=YAO_NAMES[i];const yaoData=guaData[yaoName]||{};lines.push(`  - ${yaoName}：${yaoData['爻辞'] || '未知'}`);}
return lines;}
function formatSimpleValue(value){if(Array.isArray(value)){return value.length>0?value.map(item=>String(item)).join('、'):'无';}
if(value&&typeof value==='object'){const entries=Object.entries(value);return entries.length>0?entries.map(([key,val])=>`${key}=${val}`).join('；'):'无';}
if(value===null||value===undefined||value===''){return'未知';}
return String(value);}
function formatFourPillars(value){if(Array.isArray(value)){const pillarNames=['年柱','月柱','日柱','时柱'];if(value.length===4){return value.map((pillar,index)=>`${pillarNames[index]}=${pillar}`).join(' / ');}
return value.map(item=>String(item)).join(' / ');}
if(value===null||value===undefined||value===''){return'未知';}
return String(value);}
function getBazi(birthday){try{if(!birthday||birthday==='未知'){return'未知';}
const birthDate=new Date(birthday);if(Number.isNaN(birthDate.getTime())){return'未知';}
const solar=Solar.fromYmdHms(birthDate.getFullYear(),birthDate.getMonth()+1,birthDate.getDate(),birthDate.getHours(),birthDate.getMinutes(),birthDate.getSeconds());const lunar=solar.getLunar();return lunar.getBaZi();}catch(error){console.error('[六爻排盘] 获取八字失败:',error);return'未知';}}
function formatPaipanMarkdown(result){const bengua=result['本卦']||{};const biangua=result['变卦']||null;const canggua=result['藏卦']||null;const dongYaoLines=buildDongYaoSummary(bengua,biangua);const fushenSummary=formatFushenSummary(canggua);const shiYao=getShiyingSummaryLine(bengua,'世');const yingYao=getShiyingSummaryLine(bengua,'应');const lines=['## 阅读说明','- 本文档按“核心信息 -> 扩展信息”排序。','- 核心信息包括：基本信息、排盘摘要、详细排盘（核心）、排盘表格。','- 扩展信息包括：本卦、变卦、神煞。','- 动爻判定规则：老阳、老阴为动爻；少阳、少阴为静爻。','- 若仅需快速判断六亲、世应、动爻、变爻，请优先阅读“排盘摘要”和“详细排盘（核心）”。','','## 基本信息',`- 姓名：${result['姓名'] || '未知'}`,`- 性别：${result['性别'] || '未知'}`,`- 生日：${result['生日'] || '未知'}`,`- 年龄：${result['年龄'] || '未知'}`,`- 出生八字：${formatFourPillars(result['八字'] || '未知')}`,`- 身份：${result['身份'] || '未知'}`,`- 占问问题：${result['占问问题'] || '未知'}`,`- 起卦时间：${result['起卦时间'] || '未知'}`,`- 起卦干支：${formatFourPillars(result['干支时间'] || '未知')}`,`- 日旬空：${result['日旬空'] || '未知'}`,'','## 排盘摘要',`- 世爻：${shiYao}`,`- 应爻：${yingYao}`,'- 动爻：',];if(dongYaoLines.length>0){dongYaoLines.forEach(line=>{lines.push(`  - ${line}`);});}else{lines.push('  - 无');}
lines.push(`- 本卦卦名：${bengua['本卦卦名'] || '未知'}`,`- 变卦卦名：${biangua ? (biangua['变卦卦名'] || '无') : '无'}`,`- 藏卦卦名：${canggua ? (canggua['藏卦卦名'] || '无') : '无'}`,`- 伏神：${fushenSummary}`,'','## 详细排盘（核心）','');lines.push(...buildDetailedYaoMarkdown(bengua,biangua,canggua));lines.push('','## 排盘表格');lines.push(...buildCoreMarkdownTable(bengua,biangua,canggua));lines.push('',...buildGuaMarkdown('本卦（扩展参考）',bengua,'本卦卦名'));if(biangua){lines.push('',...buildGuaMarkdown('变卦（扩展参考）',biangua,'变卦卦名'));}
const shensha=result['神煞']||{};if(Object.keys(shensha).length>0){lines.push('','## 神煞（后续阶段参考）');Object.entries(shensha).forEach(([key,value])=>{lines.push(`- ${key}：${formatSimpleValue(value)}`);});}
return lines.join('\n');}
function paipanMarkdown(params){return formatPaipanMarkdown(paipan(params));}
function paipan(params){if(!checkDependencies()){console.error('依赖模块未加载，无法执行排盘');return{};}
const{params:yaoParams,time}=params;const date=new Date(time);const solar=Solar.fromYmdHms(date.getFullYear(),date.getMonth()+1,date.getDate(),date.getHours(),0,0);const lunar=solar.getLunar();const ganzhi=lunar.getBaZi();const xkong=lunar.getDayXunKong();const result={};result['姓名']=params.name||'';result['性别']=params.gender||'';result['生日']=params.birthday||'未知';result['年龄']=params.birthday?calculateAge(params.birthday):'未知';result['八字']=params.birthday?getBazi(params.birthday):'未知';result['身份']=params.identity||'';result['占问问题']=params.question||'';result['起卦时间']=time;result['干支时间']=ganzhi;result['日旬空']=xkong;result['卦码']=yaoParams;const guaCode=convertParamsToMark(yaoParams);const benguaGuaming=getGuaming(guaCode);const yinyang=convertParamsToYinyangDict(yaoParams);const shiying=getShiying(yaoParams);const yaoNajia=getYaoNajia(guaCode);const yaoWuxing=getNajiaWuxing(guaCode);const benguaWuxing=GUAMING_TO_WUXING[benguaGuaming]||'';const yaoLiuqin=getYaoLiuqin(guaCode,benguaWuxing);const dayGan=ganzhi[2][0];const yaoLiushen=getYaoLiushen(dayGan);const benguaGuaci=liuyaoGuaciData.getGuaci(benguaGuaming);const benguaResult={'本卦':{'本卦卦名':benguaGuaming,'卦辞':benguaGuaci['卦辞']||'','彖曰':benguaGuaci['彖曰']||'','象曰':benguaGuaci['象曰']||'','初爻':{'阴阳':yinyang['初爻'],'世应':shiying['初爻'],'纳甲':yaoNajia['初爻'],'五行':yaoWuxing['初爻'],'六亲':yaoLiuqin['初爻'],'六神':yaoLiushen['初爻'],'爻辞':benguaGuaci['初爻']||''},'二爻':{'阴阳':yinyang['二爻'],'世应':shiying['二爻'],'纳甲':yaoNajia['二爻'],'五行':yaoWuxing['二爻'],'六亲':yaoLiuqin['二爻'],'六神':yaoLiushen['二爻'],'爻辞':benguaGuaci['二爻']||''},'三爻':{'阴阳':yinyang['三爻'],'世应':shiying['三爻'],'纳甲':yaoNajia['三爻'],'五行':yaoWuxing['三爻'],'六亲':yaoLiuqin['三爻'],'六神':yaoLiushen['三爻'],'爻辞':benguaGuaci['三爻']||''},'四爻':{'阴阳':yinyang['四爻'],'世应':shiying['四爻'],'纳甲':yaoNajia['四爻'],'五行':yaoWuxing['四爻'],'六亲':yaoLiuqin['四爻'],'六神':yaoLiushen['四爻'],'爻辞':benguaGuaci['四爻']||''},'五爻':{'阴阳':yinyang['五爻'],'世应':shiying['五爻'],'纳甲':yaoNajia['五爻'],'五行':yaoWuxing['五爻'],'六亲':yaoLiuqin['五爻'],'六神':yaoLiushen['五爻'],'爻辞':benguaGuaci['五爻']||''},'六爻':{'阴阳':yinyang['六爻'],'世应':shiying['六爻'],'纳甲':yaoNajia['六爻'],'五行':yaoWuxing['六爻'],'六亲':yaoLiuqin['六爻'],'六神':yaoLiushen['六爻'],'爻辞':benguaGuaci['六爻']||''},}};Object.assign(result,benguaResult);if(hasDong(yaoParams)){const bianguaParam=getBianguaParam(yaoParams);const bianguaCode=convertParamsToMark(bianguaParam);const bianguaYinyang=convertParamsToYinyangDict(bianguaParam);const bianguaGuaming=getGuaming(bianguaCode);const bianguaNajia=getYaoNajia(bianguaCode);const bianguaWuxing=getNajiaWuxing(bianguaCode);const bianguaLiuqin=getYaoLiuqin(bianguaCode,benguaWuxing);const bianguaGuaci=liuyaoGuaciData.getGuaci(bianguaGuaming);const bianguaResult={'变卦':{'变卦卦名':bianguaGuaming,'卦辞':bianguaGuaci['卦辞']||'','彖曰':bianguaGuaci['彖曰']||'','象曰':bianguaGuaci['象曰']||'','初爻':{'阴阳':bianguaYinyang['初爻'],'纳甲':bianguaNajia['初爻'],'五行':bianguaWuxing['初爻'],'六亲':bianguaLiuqin['初爻'],'爻辞':bianguaGuaci['初爻']||''},'二爻':{'阴阳':bianguaYinyang['二爻'],'纳甲':bianguaNajia['二爻'],'五行':bianguaWuxing['二爻'],'六亲':bianguaLiuqin['二爻'],'爻辞':bianguaGuaci['二爻']||''},'三爻':{'阴阳':bianguaYinyang['三爻'],'纳甲':bianguaNajia['三爻'],'五行':bianguaWuxing['三爻'],'六亲':bianguaLiuqin['三爻'],'爻辞':bianguaGuaci['三爻']||''},'四爻':{'阴阳':bianguaYinyang['四爻'],'纳甲':bianguaNajia['四爻'],'五行':bianguaWuxing['四爻'],'六亲':bianguaLiuqin['四爻'],'爻辞':bianguaGuaci['四爻']||''},'五爻':{'阴阳':bianguaYinyang['五爻'],'纳甲':bianguaNajia['五爻'],'五行':bianguaWuxing['五爻'],'六亲':bianguaLiuqin['五爻'],'爻辞':bianguaGuaci['五爻']||''},'六爻':{'阴阳':bianguaYinyang['六爻'],'纳甲':bianguaNajia['六爻'],'五行':bianguaWuxing['六爻'],'六亲':bianguaLiuqin['六爻'],'爻辞':bianguaGuaci['六爻']||''},}};Object.assign(result,bianguaResult);}
const missingQin=hasCanggua(yaoLiuqin);if(missingQin.length>0){const cangguaParam=getCangguaParam(guaCode);const cangguaCode=convertParamsToMark(cangguaParam);const cangguaYinyang=convertParamsToYinyangDict(cangguaParam);const cangguaGuaming=getGuaming(cangguaCode);const cangguaNajia=getYaoNajia(cangguaCode);const cangguaWuxing=getNajiaWuxing(cangguaCode);const cangguaLiuqin=getYaoLiuqin(cangguaCode,GUAMING_TO_WUXING[cangguaGuaming]||'');const fushen=yaoFushen(cangguaLiuqin,missingQin);const cangguaGuaci=liuyaoGuaciData.getGuaci(cangguaGuaming);const cangguaResult={'藏卦':{'藏卦卦名':cangguaGuaming,'卦辞':cangguaGuaci['卦辞']||'','彖曰':cangguaGuaci['彖曰']||'','象曰':cangguaGuaci['象曰']||'','初爻':{'阴阳':cangguaYinyang['初爻'],'伏神':fushen['初爻'],'纳甲':cangguaNajia['初爻'],'五行':cangguaWuxing['初爻'],'六亲':cangguaLiuqin['初爻'],'爻辞':cangguaGuaci['初爻']||''},'二爻':{'阴阳':cangguaYinyang['二爻'],'伏神':fushen['二爻'],'纳甲':cangguaNajia['二爻'],'五行':cangguaWuxing['二爻'],'六亲':cangguaLiuqin['二爻'],'爻辞':cangguaGuaci['二爻']||''},'三爻':{'阴阳':cangguaYinyang['三爻'],'伏神':fushen['三爻'],'纳甲':cangguaNajia['三爻'],'五行':cangguaWuxing['三爻'],'六亲':cangguaLiuqin['三爻'],'爻辞':cangguaGuaci['三爻']||''},'四爻':{'阴阳':cangguaYinyang['四爻'],'伏神':fushen['四爻'],'纳甲':cangguaNajia['四爻'],'五行':cangguaWuxing['四爻'],'六亲':cangguaLiuqin['四爻'],'爻辞':cangguaGuaci['四爻']||''},'五爻':{'阴阳':cangguaYinyang['五爻'],'伏神':fushen['五爻'],'纳甲':cangguaNajia['五爻'],'五行':cangguaWuxing['五爻'],'六亲':cangguaLiuqin['五爻'],'爻辞':cangguaGuaci['五爻']||''},'六爻':{'阴阳':cangguaYinyang['六爻'],'伏神':fushen['六爻'],'纳甲':cangguaNajia['六爻'],'五行':cangguaWuxing['六爻'],'六亲':cangguaLiuqin['六爻'],'爻辞':cangguaGuaci['六爻']||''},}};Object.assign(result,cangguaResult);}
const dayZhi=ganzhi[2][1];const monthZhi=ganzhi[1][1];result['神煞']=liuyaoShensha.getShensha(dayGan,dayZhi,monthZhi);return result;}
function calculateAge(birthday){try{if(!birthday||birthday==='未知'){return'未知';}
const birthDate=new Date(birthday);if(Number.isNaN(birthDate.getTime())){return'未知';}
const today=new Date();let age=today.getFullYear()-birthDate.getFullYear();const currentMonth=today.getMonth();const currentDay=today.getDate();const birthMonth=birthDate.getMonth();const birthDay=birthDate.getDate();if(currentMonth<birthMonth||(currentMonth===birthMonth&&currentDay<birthDay)){age--;}
return age;}catch(e){return'未知';}}
return{paipan:paipan,paipanMarkdown:paipanMarkdown,formatPaipanMarkdown:formatPaipanMarkdown,};})();window.liuyaoAlgorithm=liuyaoAlgorithm;;const liuyao=(()=>{'use strict';let isRestoring=false;let hasInitializedInputListeners=false;let hasInitializedSymbolListeners=false;async function init(){initSymbols();initLiuyaoClickListener();initInputListener();const data=await calculatePaipan();if(data){updatePaipan(data);}
await initInputsStorage();}
async function initInputsStorage(){liuyaoLocalStorage.batchUpdateStorageData(buildStorageInputData());}
function buildStorageInputData(){return{name:document.getElementById('name')?.value||'',gender:document.getElementById('gender')?.value||'',birthday:document.getElementById('birthday')?.value||'',identity:document.getElementById('identity')?.value||'',question:document.getElementById('question')?.value||'',time:document.getElementById('time')?.value||'',category:document.getElementById('agent')?.getAttribute('data-category')||'',agent:document.getElementById('agent')?.value||'',mode:document.getElementById('mode')?.value||'',};}
function syncQuestionToStoredGuaxiang(question){const storedData=liuyaoLocalStorage.getData();if(!storedData||!storedData.baseGuaxiang){return;}
storedData.baseGuaxiang['占问问题']=question;liuyaoLocalStorage.batchUpdateStorageData({baseGuaxiang:storedData.baseGuaxiang,markdownGuaxiang:buildMarkdownGuaxiang(storedData.baseGuaxiang),});}
function syncFormDataToStorage(){const inputData=buildStorageInputData();liuyaoLocalStorage.batchUpdateStorageData(inputData);syncQuestionToStoredGuaxiang(inputData.question);}
function initInputListener(){if(hasInitializedInputListeners){return;}
const inputFields=['name','gender','birthday','identity','question','time','agent','mode',];inputFields.forEach(field=>{document.getElementById(field).addEventListener('change',async function(){liuyaoLocalStorage.setStorageData(field,this.value);if(field==='question'){syncQuestionToStoredGuaxiang(this.value);}
if(!isRestoring){const data=await calculatePaipan();if(data){updatePaipan(data);}}})})
const questionElement=document.getElementById('question');if(questionElement){questionElement.addEventListener('input',function(){liuyaoLocalStorage.setStorageData('question',this.value);syncQuestionToStoredGuaxiang(this.value);});}
hasInitializedInputListeners=true;}
function restoreSymbolsState(params){if(!Array.isArray(params))return;params.forEach((state,index)=>{const symbol=document.getElementById(`${index + 1}yao`);if(symbol){applySymbolStyle(symbol,state);}});}
function initSymbols(){const benguaSymbols=document.querySelectorAll('.bengua-symbol');const cangguaWai=document.querySelector('.canggua-wai');const bianguaWai=document.querySelector('.biangua-wai');if(cangguaWai)cangguaWai.style.display='none';if(bianguaWai)bianguaWai.style.display='none';for(const symbol of benguaSymbols){symbol.setAttribute('data-symbol','1');applySymbolStyle(symbol,1);}}
function initLiuyaoClickListener(){if(hasInitializedSymbolListeners){return;}
const benguaSymbols=document.querySelectorAll('.bengua-symbol');benguaSymbols.forEach(symbol=>{const img=symbol.querySelector('.symbol-img');if(img){symbol.addEventListener('click',benguaClick);}});hasInitializedSymbolListeners=true;}
async function calculatePaipan(){try{const data=collectData();return await liuyaoAlgorithm.paipan(data);}catch(error){messageModule.error({content:`排盘计算失败: ${error.message}`});return null;}}
function collectData(){const data={params:getParams(),name:'',gender:'',birthday:'',identity:'',question:'',time:'',};const fields=['name','gender','birthday','identity','question','time','agent'];fields.forEach(field=>{const element=document.getElementById(field);if(element){if(field==='agent'){data.category=element.getAttribute('data-category');data.model=element.value;}else{data[field]=element.value;}}else{console.warn(`collectData: 字段 ${field} 未找到`);}});return data;}
function getParams(){try{return Array.from({length:6},(_,i)=>{const symbol=document.getElementById(`${i + 1}yao`);if(!symbol){messageModule.error({content:'获取卦码参数失败，使用默认值1'});return 1;}
return parseInt(symbol.getAttribute('data-symbol'))||1;});}catch(error){messageModule.error({content:`获取爻参数出错:${error}`});return[1,1,1,1,1,1];}}
async function benguaClick(event){const liuyaoTimeInput=document.getElementById('time');const symbol=event.currentTarget;if(!liuyaoTimeInput.value){messageModule.info({content:'请输入起卦时间'});return;}
const current=parseInt(symbol.getAttribute('data-symbol'))||1;const nextState=current%4+1;await updateSymbolStyle(symbol,nextState);}
function applySymbolStyle(symbol,state){const img=symbol.querySelector('.symbol-img');if(!img)return;img.classList.remove('yang','yin','lao-yang','lao-yin');switch(state){case 1:img.classList.add('yang');break;case 2:img.classList.add('yin');break;case 3:img.classList.add('yang','lao-yang');break;case 4:img.classList.add('yin','lao-yin');break;}
symbol.setAttribute('data-symbol',state);}
async function updateSymbolStyle(symbol,state){applySymbolStyle(symbol,state);updateBiangua();try{const paipanData=await calculatePaipan();if(paipanData){updatePaipan(paipanData);}}catch(error){messageModule.error({content:`排盘失败：${error.message}`});}}
function updateBiangua(){const benguaSymbols=document.querySelectorAll('.bengua-symbol');benguaSymbols.forEach(symbol=>{const state=parseInt(symbol.getAttribute('data-symbol'))||1;const bianguaSymbol=document.getElementById('biangua-'+symbol.id);if(!bianguaSymbol)return;const bianguaImg=bianguaSymbol.querySelector('.symbol-img');if(!bianguaImg)return;let bianguaState;if(state===3){bianguaState=2;}else if(state===4){bianguaState=1;}else{bianguaState=state;}
bianguaSymbol.setAttribute('data-symbol',bianguaState);bianguaImg.classList.remove('yang','yin');bianguaImg.classList.add(bianguaState===1?'yang':'yin');});}
function updatePaipan(data){const cangguaWai=document.querySelector('.canggua-wai');const bianguaWai=document.querySelector('.biangua-wai');const markdownGuaxiang=buildMarkdownGuaxiang(data);updateGuaming(data);updateGz(data);updateShenshaGrid(data);updateChuyao(data);updateEryao(data);updateSanyao(data);updateSiyao(data);updateWuyao(data);updateLiuyao(data);if(data['变卦']){bianguaWai.style.display='block';updateBianGuaGuaming(data);updateBianGuaChuyao(data);updateBianGuaEryao(data);updateBianGuaSanyao(data);updateBianGuaSiyao(data);updateBianGuaWuyao(data);updateBianGuaLiuyao(data);}else{bianguaWai.style.display='none';}
if(data['藏卦']){cangguaWai.style.display='block';updateCangguaGuaming(data);updateCangguaChuyao(data);updateCangguaEryao(data);updateCangguaSanyao(data);updateCangguaSiyao(data);updateCangguaWuyao(data);updateCangguaLiuyao(data);}else{cangguaWai.style.display='none';}
liuyaoLocalStorage.batchUpdateStorageData({baseGuaxiang:data,markdownGuaxiang:markdownGuaxiang,})}
function buildMarkdownGuaxiang(data){try{if(typeof liuyaoAlgorithm==='undefined'||typeof liuyaoAlgorithm.formatPaipanMarkdown!=='function'){console.warn('[六爻排盘] 缺少 Markdown 格式化能力，markdownGuaxiang 将置空');return'';}
return liuyaoAlgorithm.formatPaipanMarkdown(data);}catch(error){console.error('[六爻排盘] 生成 Markdown 卦象失败:',error);return'';}}
function updateGuaming(data){const benguaGuaming=document.getElementById('bengua-guaming');if(benguaGuaming){benguaGuaming.textContent=data['本卦']['本卦卦名'];}}
function updateGz(data){if(!data['干支时间'])return;const gzTime=data['干支时间'];document.getElementById('year-gz').textContent=gzTime[0]||'';document.getElementById('month-gz').textContent=gzTime[1]||'';document.getElementById('day-gz').textContent=gzTime[2]||'';document.getElementById('xkong').textContent=data['日旬空']||'';}
function updateChuyao(data){const chuyao=data['本卦']['初爻'];document.getElementById('bengua-1yao-6shen').textContent=chuyao['六神'];document.getElementById('bengua-1yao-6q').textContent=chuyao['六亲'];document.getElementById('bengua-1yao-nj').textContent=chuyao['纳甲'];document.getElementById('bengua-1yao-5x').textContent=chuyao['五行'];document.getElementById('bengua-1yao-sy').textContent=chuyao['世应'];const element=document.getElementById('bengua-1yao-d');if(element){if(chuyao['阴阳']==='老阴'){element.textContent='×→';}else if(chuyao['阴阳']==='老阳'){element.textContent='○→';}else{element.textContent='';}}else{console.warn('元素 "bengua-1yao-d" 未找到');}}
function updateEryao(data){const eryao=data['本卦']['二爻'];document.getElementById('bengua-2yao-6shen').textContent=eryao['六神'];document.getElementById('bengua-2yao-6q').textContent=eryao['六亲'];document.getElementById('bengua-2yao-nj').textContent=eryao['纳甲'];document.getElementById('bengua-2yao-5x').textContent=eryao['五行'];document.getElementById('bengua-2yao-sy').textContent=eryao['世应'];const element=document.getElementById('bengua-2yao-d');if(element){if(eryao['阴阳']==='老阴'){element.textContent='×→';}else if(eryao['阴阳']==='老阳'){element.textContent='○→';}else{element.textContent='';}}else{console.warn('元素 "bengua-2yao-d" 未找到');}}
function updateSanyao(data){const sanyao=data['本卦']['三爻'];document.getElementById('bengua-3yao-6shen').textContent=sanyao['六神'];document.getElementById('bengua-3yao-6q').textContent=sanyao['六亲'];document.getElementById('bengua-3yao-nj').textContent=sanyao['纳甲'];document.getElementById('bengua-3yao-5x').textContent=sanyao['五行'];document.getElementById('bengua-3yao-sy').textContent=sanyao['世应'];const element=document.getElementById('bengua-3yao-d');if(element){if(sanyao['阴阳']==='老阴'){element.textContent='×→';}else if(sanyao['阴阳']==='老阳'){element.textContent='○→';}else{element.textContent='';}}else{console.warn('元素 "bengua-3yao-d" 未找到');}}
function updateSiyao(data){const siyao=data['本卦']['四爻'];document.getElementById('bengua-4yao-6shen').textContent=siyao['六神'];document.getElementById('bengua-4yao-6q').textContent=siyao['六亲'];document.getElementById('bengua-4yao-nj').textContent=siyao['纳甲'];document.getElementById('bengua-4yao-5x').textContent=siyao['五行'];document.getElementById('bengua-4yao-sy').textContent=siyao['世应'];const element=document.getElementById('bengua-4yao-d');if(element){if(siyao['阴阳']==='老阴'){element.textContent='×→';}else if(siyao['阴阳']==='老阳'){element.textContent='○→';}else{element.textContent='';}}else{console.warn('元素 "bengua-4yao-d" 未找到');}}
function updateWuyao(data){const wuyao=data['本卦']['五爻'];document.getElementById('bengua-5yao-6shen').textContent=wuyao['六神'];document.getElementById('bengua-5yao-6q').textContent=wuyao['六亲'];document.getElementById('bengua-5yao-nj').textContent=wuyao['纳甲'];document.getElementById('bengua-5yao-5x').textContent=wuyao['五行'];document.getElementById('bengua-5yao-sy').textContent=wuyao['世应'];const element=document.getElementById('bengua-5yao-d');if(element){if(wuyao['阴阳']==='老阴'){element.textContent='×→';}else if(wuyao['阴阳']==='老阳'){element.textContent='○→';}else{element.textContent='';}}else{console.warn('元素 "bengua-5yao-d" 未找到');}}
function updateLiuyao(data){const liuyao=data['本卦']['六爻'];document.getElementById('bengua-6yao-6shen').textContent=liuyao['六神'];document.getElementById('bengua-6yao-6q').textContent=liuyao['六亲'];document.getElementById('bengua-6yao-nj').textContent=liuyao['纳甲'];document.getElementById('bengua-6yao-5x').textContent=liuyao['五行'];document.getElementById('bengua-6yao-sy').textContent=liuyao['世应'];const element=document.getElementById('bengua-6yao-d');if(element){if(liuyao['阴阳']==='老阴'){element.textContent='×→';}else if(liuyao['阴阳']==='老阳'){element.textContent='○→';}else{element.textContent='';}}else{console.warn('元素 "bengua-6yao-d" 未找到');}}
function updateShenshaGrid(data){if(!data['神煞'])return;const shenshaData=data['神煞'];const dizhiToShensha={};Object.entries(shenshaData).forEach(([shenshaName,dizhiValue])=>{if(dizhiValue){const dizhiList=Array.isArray(dizhiValue)?dizhiValue:[dizhiValue];dizhiList.forEach(dizhi=>{if(!dizhiToShensha[dizhi]){dizhiToShensha[dizhi]=[];}
dizhiToShensha[dizhi].push(shenshaName);});}});const shenshaMap={'子':'zi-shen','丑':'chou-shen','寅':'yin-shen','卯':'mao-shen','辰':'chen-shen','巳':'si-shen','午':'wu-shen','未':'wei-shen','申':'shen-shen','酉':'you-shen','戌':'xu-shen','亥':'hai-shen'};Object.entries(shenshaMap).forEach(([dizhi,elementId])=>{const element=document.getElementById(elementId);if(element){const content=dizhiToShensha[dizhi];if(content&&content.length>0){element.innerHTML=content.join('<br>');}else{element.textContent='无';}}});}
function updateBianGuaGuaming(data){if(!data['变卦'])return;const element=document.getElementById('biangua-guaming');if(element)element.textContent=data['变卦']['变卦卦名'];}
function updateBianGuaYinYang(elementId,yinYang){const symbolElement=document.getElementById(elementId);if(!symbolElement)return;const symbolImg=symbolElement.querySelector('.symbol-img');if(!symbolImg)return;let state=1;if(yinYang==='少阳'||yinYang==='老阳'){state=1;}else if(yinYang==='少阴'||yinYang==='老阴'){state=2;}
symbolElement.setAttribute('data-symbol',state);symbolImg.classList.remove('yang','yin');symbolImg.classList.add(state===1?'yang':'yin');}
function updateBianGuaChuyao(data){const chuyao=data['变卦']['初爻'];document.getElementById('biangua-1yao-6q').textContent=chuyao['六亲'];document.getElementById('biangua-1yao-nj').textContent=chuyao['纳甲'];document.getElementById('biangua-1yao-5x').textContent=chuyao['五行'];updateBianGuaYinYang('biangua-1yao',chuyao['阴阳']);}
function updateBianGuaEryao(data){const eryao=data['变卦']['二爻'];document.getElementById('biangua-2yao-6q').textContent=eryao['六亲'];document.getElementById('biangua-2yao-nj').textContent=eryao['纳甲'];document.getElementById('biangua-2yao-5x').textContent=eryao['五行'];updateBianGuaYinYang('biangua-2yao',eryao['阴阳']);}
function updateBianGuaSanyao(data){const sanyao=data['变卦']['三爻'];document.getElementById('biangua-3yao-6q').textContent=sanyao['六亲'];document.getElementById('biangua-3yao-nj').textContent=sanyao['纳甲'];document.getElementById('biangua-3yao-5x').textContent=sanyao['五行'];updateBianGuaYinYang('biangua-3yao',sanyao['阴阳']);}
function updateBianGuaSiyao(data){const siyao=data['变卦']['四爻'];document.getElementById('biangua-4yao-6q').textContent=siyao['六亲'];document.getElementById('biangua-4yao-nj').textContent=siyao['纳甲'];document.getElementById('biangua-4yao-5x').textContent=siyao['五行'];updateBianGuaYinYang('biangua-4yao',siyao['阴阳']);}
function updateBianGuaWuyao(data){const wuyao=data['变卦']['五爻'];document.getElementById('biangua-5yao-6q').textContent=wuyao['六亲'];document.getElementById('biangua-5yao-nj').textContent=wuyao['纳甲'];document.getElementById('biangua-5yao-5x').textContent=wuyao['五行'];updateBianGuaYinYang('biangua-5yao',wuyao['阴阳']);}
function updateBianGuaLiuyao(data){const liuyao=data['变卦']['六爻'];document.getElementById('biangua-6yao-6q').textContent=liuyao['六亲'];document.getElementById('biangua-6yao-nj').textContent=liuyao['纳甲'];document.getElementById('biangua-6yao-5x').textContent=liuyao['五行'];updateBianGuaYinYang('biangua-6yao',liuyao['阴阳']);}
function updateCangguaGuaming(data){if(!data['藏卦'])return;const element=document.getElementById('cg-guaming');if(element)element.textContent=data['藏卦']['藏卦卦名'];}
function updateCangguaChuyao(data){const chuyao=data['藏卦']['初爻'];document.getElementById('cg-1yao-6q').textContent=chuyao['六亲'];document.getElementById('cg-1yao-nj').textContent=chuyao['纳甲'];document.getElementById('cg-1yao-5x').textContent=chuyao['五行'];const element=document.getElementById('cg-1yao');element.classList.remove('highlight','hidden');if(chuyao['伏神']==='true'){element.classList.add('highlight');}else{element.classList.add('hidden');}}
function updateCangguaEryao(data){const eryao=data['藏卦']['二爻'];document.getElementById('cg-2yao-6q').textContent=eryao['六亲'];document.getElementById('cg-2yao-nj').textContent=eryao['纳甲'];document.getElementById('cg-2yao-5x').textContent=eryao['五行'];const element=document.getElementById('cg-2yao');element.classList.remove('highlight','hidden');if(eryao['伏神']==='true'){element.classList.add('highlight');}else{element.classList.add('hidden');}}
function updateCangguaSanyao(data){const sanyao=data['藏卦']['三爻'];document.getElementById('cg-3yao-6q').textContent=sanyao['六亲'];document.getElementById('cg-3yao-nj').textContent=sanyao['纳甲'];document.getElementById('cg-3yao-5x').textContent=sanyao['五行'];const element=document.getElementById('cg-3yao');element.classList.remove('highlight','hidden');if(sanyao['伏神']==='true'){element.classList.add('highlight');}else{element.classList.add('hidden');}}
function updateCangguaSiyao(data){const siyao=data['藏卦']['四爻'];document.getElementById('cg-4yao-6q').textContent=siyao['六亲'];document.getElementById('cg-4yao-nj').textContent=siyao['纳甲'];document.getElementById('cg-4yao-5x').textContent=siyao['五行'];const element=document.getElementById('cg-4yao');element.classList.remove('highlight','hidden');if(siyao['伏神']==='true'){element.classList.add('highlight');}else{element.classList.add('hidden');}}
function updateCangguaWuyao(data){const wuyao=data['藏卦']['五爻'];document.getElementById('cg-5yao-6q').textContent=wuyao['六亲'];document.getElementById('cg-5yao-nj').textContent=wuyao['纳甲'];document.getElementById('cg-5yao-5x').textContent=wuyao['五行'];const element=document.getElementById('cg-5yao');element.classList.remove('highlight','hidden');if(wuyao['伏神']==='true'){element.classList.add('highlight');}else{element.classList.add('hidden');}}
function updateCangguaLiuyao(data){const liuyao=data['藏卦']['六爻'];document.getElementById('cg-6yao-6q').textContent=liuyao['六亲'];document.getElementById('cg-6yao-nj').textContent=liuyao['纳甲'];document.getElementById('cg-6yao-5x').textContent=liuyao['五行'];const element=document.getElementById('cg-6yao');element.classList.remove('highlight','hidden');if(liuyao['伏神']==='true'){element.classList.add('highlight');}else{element.classList.add('hidden');}}
async function restorePaipan(){try{const paipanData=await calculatePaipan();if(paipanData){updatePaipan(paipanData);}else{console.warn('restorePaipan: 排盘数据为空');}}catch(error){console.error('restorePaipan: 恢复排盘数据失败',error);messageModule.error({content:`恢复排盘数据失败: ${error.message}`});}}
return{init:init,updateSymbolStyle:updateSymbolStyle,restoreSymbolsState:restoreSymbolsState,collectData:collectData,getParams:getParams,restorePaipan:restorePaipan,initInputsStorage:initInputsStorage,syncFormDataToStorage:syncFormDataToStorage,setRestoring:(state)=>{isRestoring=state;},getRestoring:()=>isRestoring};})();document.addEventListener('DOMContentLoaded',function(){document.addEventListener('infoInputModuleReady',()=>{liuyao.init();},{once:true});});;(()=>{document.getElementById('help').addEventListener('click',showHelp);function showHelp(){messageModule.show({title:'如何填写信息',content:`
            <p><strong>姓名：</strong>真名假名均可。</p>
            <p><strong>性别：</strong>必须是占问人的真实性别。</p>
            <p><strong>出生日期：</strong>精确到日即可，需填写公历。</p>
            <p><strong>身份：</strong>即你的职业，可以是学生、生意人、打工人等，选填。</p>
            <p><strong>占问事项：</strong>简略的填写需要问的问题，无需描述过多的背景信息。</p>
            <p><strong>占问时间：</strong>即起卦的时间。</p>
            <p><strong>工作流模式：</strong></p>
                <p><strong>标准流式：</strong>即使用基本工作流进行解读，知识库+工作流+mcp服务，优势是速度快，劣势是由于工作流为线行运行，偶尔会出现幻觉。</p>
                <p><strong>集群解读（新增）：</strong>与最近爆火的open_claw（龙虾）架构类似，也称为蜂群模式，即多个智能体构成，线行与并行同时处理，自动调用不同的智能体处理不同的工作。准确度最高，能达到人工解读无法企及的全面性。劣势是速度很慢，一般需要10-20分钟左右。然后就是极其消耗token，与知识库、mcp服务等协同后，一次解读甚至能使用30+成本的token，建议重要问题再选择这个</p>
            <p><strong>解读风格：</strong></p>
                <p><strong>专业解析：</strong>保留了所有专业术语的解读报告，适合对六爻了解的卦师，或者学习六爻的人使用，能更深入的了解六爻。</p>
                <p><strong>白话解读：</strong>去除了让普通人难以理解的专业术语，并转变为更易读懂的语言。</p>
            <blockquote>
            </blockquote>
            `,confirmText:'我明白了',isHtml:true});}})();;const liuyaoFetch=(()=>{'use strict';function normalizeTaskStatusResponse(data){if(!data||typeof data!=='object'){return data;}
const statusMap={PENDING:'pending',WAITING_RESOURCE:'waiting_resource',RUNNING:'processing',SUCCESS:'completed',FAILED:'failed',CANCELLED:'cancelled'};if(data.status&&statusMap[data.status]){data.status=statusMap[data.status];}
if(!data.result_analysis&&data['result_text']){data.result_analysis=data['result_text'];}
if(!data.reasoning_process&&data['reasoning_text']){data.reasoning_process=data['reasoning_text'];}
return data;}
function getInputValue(id){const element=document.getElementById(id);return element?element.value:'';}
function buildFeeConfirmMessage(data){const labelMap={vip_quota:'【本次使用 VIP 次数】',balance:'【本次扣除积分】',free:'【本次免费】'};const label=labelMap[data.payment_method]||'【费用确认】';return`${label}\n${data.message || '请确认是否继续解读'}`;}
function ensureGuaxiangPayload(liuyaoData){let baseGuaxiang=liuyaoData.baseGuaxiang;let markdownGuaxiang=liuyaoData.markdownGuaxiang;if(!baseGuaxiang&&typeof liuyao!=='undefined'&&typeof liuyao.collectData==='function'&&typeof liuyaoAlgorithm!=='undefined'&&typeof liuyaoAlgorithm.paipan==='function'){try{baseGuaxiang=liuyaoAlgorithm.paipan(liuyao.collectData());}catch(error){console.error('[六爻提交] 补算结构化卦象失败:',error);}}
if(!markdownGuaxiang&&baseGuaxiang&&typeof liuyaoAlgorithm!=='undefined'&&typeof liuyaoAlgorithm.formatPaipanMarkdown==='function'){try{markdownGuaxiang=liuyaoAlgorithm.formatPaipanMarkdown(baseGuaxiang);}catch(error){console.error('[六爻提交] 生成 Markdown 卦象失败:',error);}}
if(baseGuaxiang){liuyaoData.baseGuaxiang=baseGuaxiang;}
if(markdownGuaxiang){liuyaoData.markdownGuaxiang=markdownGuaxiang;}
if(baseGuaxiang||markdownGuaxiang){liuyaoLocalStorage.batchUpdateStorageData({baseGuaxiang:baseGuaxiang||liuyaoData.baseGuaxiang||'',markdownGuaxiang:markdownGuaxiang||liuyaoData.markdownGuaxiang||'',});}
return liuyaoData;}
function buildSubmitPayload(){if(typeof liuyao!=='undefined'&&typeof liuyao.syncFormDataToStorage==='function'){liuyao.syncFormDataToStorage();}
let liuyaoData=liuyaoLocalStorage.getData();if(!liuyaoData||typeof liuyaoData!=='object'){liuyaoData={};}
liuyaoData.name=getInputValue('name');liuyaoData.gender=getInputValue('gender');liuyaoData.birthday=getInputValue('birthday');liuyaoData.identity=getInputValue('identity');liuyaoData.question=getInputValue('question');liuyaoData.time=getInputValue('time');const agentElement=document.getElementById('agent');if(agentElement){liuyaoData.agent=agentElement.value;liuyaoData.category=agentElement.getAttribute('data-category');}
if(!liuyaoData.mode)liuyaoData.mode=getInputValue('mode')||'single';liuyaoData=ensureGuaxiangPayload(liuyaoData);return liuyaoData;}
async function isLogin(){return true;}
async function confirmJieguaFee(){return true;}
async function submitTask(){const liuyaoData=buildSubmitPayload();if(liuyaoData&&!liuyaoData.mode){liuyaoData.mode=liuyaoLocalStorage.DEFAULT_DATA.mode;}
if(liuyaoData&&!liuyaoData.agent){liuyaoData.agent=liuyaoLocalStorage.DEFAULT_DATA.agent;}
if(liuyaoData&&!liuyaoData.category){liuyaoData.category=liuyaoLocalStorage.DEFAULT_DATA.category;}
liuyaoData.biz_type='liuyao';liuyaoData.created_at=new Date().toISOString();liuyaoLocalStorage.batchUpdateStorageData({created_at:liuyaoData.created_at,taskStartedAt:Date.now(),shareUrl:''});return liuyaoUtils.requestJson('/api/ai/tasks/',{method:'POST',headers:{'Content-Type':'application/json','X-CSRFToken':liuyaoUtils.getCookie('csrftoken')},body:JSON.stringify(liuyaoData)});}
async function fetchTaskStatus(taskId){const data=await liuyaoUtils.requestJson(`/api/ai/tasks/${taskId}/`,{method:'GET',headers:{'X-CSRFToken':liuyaoUtils.getCookie('csrftoken')}});return normalizeTaskStatusResponse(data);}
async function fetchLatestActiveTask(bizType='liuyao'){const data=await liuyaoUtils.requestJson(`/api/ai/tasks/latest-active/?biz_type=${encodeURIComponent(bizType)}`,{method:'GET',headers:{'X-CSRFToken':liuyaoUtils.getCookie('csrftoken')}});if(data&&data.task){data.task=normalizeTaskStatusResponse(data.task);}
return data;}
async function cancelTask(taskId){return liuyaoUtils.requestJson(`/api/ai/tasks/${taskId}/cancel/`,{method:'POST',headers:{'X-CSRFToken':liuyaoUtils.getCookie('csrftoken')}});}
return{isLogin:isLogin,confirmJieguaFee:confirmJieguaFee,submitTask:submitTask,fetchTaskStatus:fetchTaskStatus,fetchLatestActiveTask:fetchLatestActiveTask,cancelTask:cancelTask,buildSubmitPayload:buildSubmitPayload}})();;const liuyaoQigua=(()=>{const qiguaBtn=document.getElementById('qigua');if(qiguaBtn){qiguaBtn.addEventListener('click',shiKongQigua);}
let clickCount=1;async function shiKongQigua(){if(clickCount>6){messageModule.toast({content:'起卦已完成！请点击重置按钮重新起卦。'});return;}
const information=`已起第${clickCount}爻`;messageModule.toast({content:information});let result=calculateYinYang();const yaoId=`${clickCount}yao`;const yaoElement=document.getElementById(yaoId);if(yaoElement){yaoElement.setAttribute('symbol-data',result);await liuyao.updateSymbolStyle(yaoElement,result);}
document.dispatchEvent(new CustomEvent('liuyaoShikongCastStep',{detail:{step:clickCount,value:result,yao_id:yaoId,completed:clickCount>=6,},}));clickCount++;if(clickCount>6){if(qiguaBtn){qiguaBtn.disabled=true;qiguaBtn.classList.add('disabled');qiguaBtn.innerHTML='起卦完成';}
messageModule.toast({content:'起卦已完成！'});document.dispatchEvent(new CustomEvent('liuyaoShikongCastComplete'));}}
function calculateYinYang(){const now=new Date();const dateTimeString=now.toISOString().replace(/[^0-9]/g,'').slice(0,14);const sum=dateTimeString.split('').reduce((acc,digit)=>acc+parseInt(digit,10),0);return(sum%4)+1;}
return{shiKongQigua,calculateYinYang,getClickCount:()=>clickCount,setClickCount:(value)=>{clickCount=value;},}})();;(()=>{'use strict';const resetBtn=document.getElementById('reset');if(resetBtn){resetBtn.addEventListener('click',resetAll);}
async function resetAll(){const confirmed=await messageModule.confirm({content:'是否要重置所有内容？'});if(!confirmed){return;}
clearUrlTempId();resetTaskRuntime();resetStorage();await resetInputAndPaipan();resetView();messageModule.info({content:'重置成功！'});}
function clearUrlTempId(){if(!window.location.search.includes('temp_id=')){return;}
const url=new URL(window.location);url.searchParams.delete('temp_id');window.history.replaceState({},document.title,url.toString());}
function resetTaskRuntime(){liuyaoJieguaAsync?.resetRuntime?.();}
function resetStorage(){liuyaoLocalStorage.resetStorage();}
async function resetInputAndPaipan(){await inputModule.init();clearQuestionInput();liuyaoQigua.setClickCount(1);await liuyao.init();await liuyao.initInputsStorage();}
function resetView(){clearResultPanel();clearSharePanel();resetAppraisePanel();liuyaoUI.resetAgentPanel();liuyaoUI.setBtnState('enable');liuyaoUI.resetResultActions();liuyaoUI.updateTips(liuyaoUtils.DEFAULT_TIPS_TEXT,false);}
function clearResultPanel(){const resultElement=document.getElementById('result');if(resultElement){resultElement.innerHTML='';}
if(typeof streamRenderer!=='undefined'){streamRenderer.clear('result');streamRenderer.clear('debate-round-0');for(let index=1;index<=5;index++){streamRenderer.clear(`debate-round-${index}`);}}
if(typeof debateMessageHandler!=='undefined'){debateMessageHandler.clearAll();}}
function clearSharePanel(){liuyaoUI.hideSharePanel();}
function resetAppraisePanel(){const appraisePanel=document.getElementById('appraise-panel');if(appraisePanel){appraisePanel.classList.remove('active');}
if(window.appraiseModule&&typeof window.appraiseModule.resetAppraisePanel==='function'){window.appraiseModule.resetAppraisePanel();}}
function clearQuestionInput(){const questionElement=document.getElementById('question');if(!questionElement){return;}
questionElement.value='';questionElement.setAttribute('value','');}})();;let debatePanelRenderer=(()=>{'use strict';function createDebateHeader(roundName){const header=document.createElement('div');header.className='debate-round-header';header.innerHTML=`<h3>${roundName}</h3><span class="debate-start-tag">开始辩论</span>`;return header;}
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
function parseMarkdownSafe(text){if(!text)return'';if(typeof liuyaoUtils!=='undefined'&&typeof liuyaoUtils.renderMarkdownSafe==='function'){return liuyaoUtils.renderMarkdownSafe(text);}
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
            <div class="debate-bubble-content">
                <div class="judge-reason judge-streaming-reason"></div>
                <div class="judge-next-instruction judge-streaming-next-instruction" style="display:none;"></div>
            </div>
        `;return bubble;}
function updateJudgeStatus(bubble,status){const statusEl=bubble?.querySelector('.judge-status');if(!statusEl){return;}
if(status==='loading'){statusEl.className='judge-status judge-status-loading';statusEl.innerHTML=`
                <span class="judge-loading-indicator"></span>
                <span class="judge-loading-text">正在分析...</span>
            `;return;}
const needDebating=status==='debating';const statusIcon=needDebating?'🔄':'✅';const statusText=needDebating?'需要继续讨论':'裁决完成';statusEl.className=`judge-status ${needDebating ? 'judge-status-continue' : 'judge-status-consensus'}`;statusEl.innerHTML=`${statusIcon} ${statusText}`;}
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
return{createState,createIncrementalJSONParser,handleJudgeDecisionStreamMessage,handleJudgeDecisionCompleteMessage,handleJudgeDecisionMessage,handleJudgeFinalStreamMessage,handleJudgeFinalCompleteMessage,resetScope,clearRoundState,resetState};})();window.debateJudgeHandler=debateJudgeHandler;;let debateMessageHandler=(()=>{'use strict';const renderer=window.debatePanelRenderer;const judgeHandler=window.debateJudgeHandler;const CONFIG={ROUND_NAMES:{round_1:'用神取用',round_2:'世应关系',round_3:'动爻分析',round_4:'现实对轨',round_5:'应期推断'},ROLES:{pro:{name:'正方',class:'debate-bubble-pro'},con:{name:'反方',class:'debate-bubble-con'},judge:{name:'裁判',class:'debate-bubble-judge'}}};let roundSpeakerMap={};let messageContentElementMap={};let messageContentTextMap={};let messageReasoningTextMap={};let scopeAttemptMap={};let judgeRuntimeState=judgeHandler.createState();let mcpSystemElementMap={};let mcpAgentOutputElementMap={};let mcpAgentReasoningElementMap={};let autoScrollEnabled=true;let scrollTimer=null;let scrollBoundContainerSet=new WeakSet();let topicMapSyncTimer=null;let lastTopicMapSnapshot='';let pendingTopicMapSeq=0;window.addEventListener('pagehide',flushTopicMapSync);function handleProtocolMessage(data){const handlers={debate_start:handleDebateStartMessage,stream_reset:handleStreamResetMessage,debate_reasoning:handleDebateReasoningMessage,debate:handleDebateMessage,judge_decision_stream:function(message){judgeHandler.handleJudgeDecisionStreamMessage(message,createJudgeContext());},judge_decision_complete:function(message){judgeHandler.handleJudgeDecisionCompleteMessage(message,createJudgeContext());},judge_decision:function(message){judgeHandler.handleJudgeDecisionMessage(message,createJudgeContext());},judge_final_stream:function(message){judgeHandler.handleJudgeFinalStreamMessage(message,createJudgeContext());},judge_final_complete:function(message){judgeHandler.handleJudgeFinalCompleteMessage(message,createJudgeContext());},round_complete:handleRoundCompleteMessage,exchange_continue:handleExchangeContinueMessage,consensus_reached:handleConsensusReachedMessage,anchor_complete:handleAnchorCompleteMessage,analysis_complete:handleAnalysisCompleteMessage,stage_transition:handleStageTransitionMessage,mcp_system:handleMcpSystemMessage,mcp_agent_output:handleMcpAgentOutputMessage,mcp_agent_reasoning:handleMcpAgentReasoningMessage};const handler=handlers[data.type];if(!handler){return false;}
handler(data);scheduleTopicMapSync(data['seq']);return true;}
function createJudgeContext(){return{state:judgeRuntimeState,renderer,appendHelpers:{initSmartScroll,smartScrollToBottom},normalizeChunk,extractTabIndex,updateTips,smartScrollToBottom,markTabCompleted:renderer.markTabCompleted,completeReasoningFor,roundSpeakerMap};}
function handleDebateStartMessage(data){const chunk=normalizeChunk(data);const roundId=chunk.round;const roundName=chunk.name||CONFIG.ROUND_NAMES[roundId]||'未知轮次';const tabIndex=extractTabIndex(roundId);const speakerKey=`round_${tabIndex}`;const targetId=`debate-round-${tabIndex}`;renderer.activateDebateTab(tabIndex);roundSpeakerMap[speakerKey]=null;messageContentElementMap[speakerKey]=null;messageContentTextMap[speakerKey]='';messageReasoningTextMap[speakerKey]='';renderer.appendToContainer(targetId,renderer.createDebateHeader(roundName),{initSmartScroll,smartScrollToBottom});updateTips(`[${roundName}] 正在辩论...点此查看详情`);}
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
function handleMcpSystemMessage(data){handleInfoPanelMessage({targetId:'debate-round-5',speakerKey:'round_5_mcp_system',title:'MCP系统',bubbleClass:'debate-bubble-default',content:data.content||'',bubbleStore:mcpSystemElementMap,querySelector:'.debate-bubble-content'});}
function handleMcpAgentOutputMessage(data){handleInfoPanelMessage({targetId:'debate-round-5',speakerKey:'round_5_mcp_output',title:'MCP智能体',bubbleClass:'debate-bubble-pro',content:data.content||'',bubbleStore:mcpAgentOutputElementMap,querySelector:'.debate-bubble-content'});}
function handleMcpAgentReasoningMessage(data){handleInfoPanelMessage({targetId:'debate-round-5',speakerKey:'round_5_mcp_reasoning',title:'MCP智能体思考',content:data.content||'',bubbleStore:mcpAgentReasoningElementMap,querySelector:'.reasoning-content',bubbleFactory:function(){return renderer.createReasoningOnlyBubble('MCP智能体思考');}});}
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
const agentPanel=document.getElementById('agent-panel');if(!agentPanel||typeof liuyaoLocalStorage==='undefined'||!window.liuyaoCasePanel){return;}
const nextTopicMap=window.liuyaoCasePanel.captureTopicMap(agentPanel);const nextSnapshot=JSON.stringify(nextTopicMap);const storedSeq=Number(liuyaoLocalStorage.getKeyData('lastStreamSeq')||0);const nextSeq=pendingTopicMapSeq>0?pendingTopicMapSeq:storedSeq;if(nextSnapshot===lastTopicMapSnapshot&&nextSeq<=storedSeq){return;}
lastTopicMapSnapshot=nextSnapshot;pendingTopicMapSeq=0;liuyaoLocalStorage.batchUpdateStorageData({topicMap:nextTopicMap,lastStreamSeq:nextSeq,});}
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
function hydrateFromDom(){reset();for(let index=1;index<=5;index+=1){hydrateRoundFromDom(index);}
const agentPanel=document.getElementById('agent-panel');if(agentPanel){lastTopicMapSnapshot=JSON.stringify(window.liuyaoCasePanel?.captureTopicMap(agentPanel)||{});}}
function extractTabIndex(roundId){return roundId?roundId.split('_')[1]:'1';}
function updateTips(message){if(typeof liuyaoUI!=='undefined'&&liuyaoUI.updateTips){liuyaoUI.updateTips(message);}}
function reset(){roundSpeakerMap={};messageContentElementMap={};messageContentTextMap={};messageReasoningTextMap={};scopeAttemptMap={};judgeHandler.resetState(judgeRuntimeState);judgeRuntimeState=judgeHandler.createState();mcpSystemElementMap={};mcpAgentOutputElementMap={};mcpAgentReasoningElementMap={};autoScrollEnabled=true;lastTopicMapSnapshot='';pendingTopicMapSeq=0;if(scrollTimer){clearTimeout(scrollTimer);scrollTimer=null;}}
function clearRound(tabIndex){const containerId=`debate-round-${tabIndex}`;const speakerKey=`round_${tabIndex}`;const container=document.getElementById(containerId);if(container){container.innerHTML='';destroySmartScroll(containerId);}
roundSpeakerMap[speakerKey]=null;messageContentElementMap[speakerKey]=null;messageContentTextMap[speakerKey]=null;messageReasoningTextMap[speakerKey]=null;judgeHandler.clearRoundState(judgeRuntimeState,speakerKey);delete messageContentTextMap[`${speakerKey}_mcp_system`];delete messageContentTextMap[`${speakerKey}_mcp_output`];delete messageContentTextMap[`${speakerKey}_mcp_reasoning`];delete mcpSystemElementMap[`${speakerKey}_mcp_system`];delete mcpAgentOutputElementMap[`${speakerKey}_mcp_output`];delete mcpAgentReasoningElementMap[`${speakerKey}_mcp_reasoning`];Object.keys(scopeAttemptMap).forEach(function(scopeId){if(scopeId.indexOf(`round_${tabIndex}:`)===0){delete scopeAttemptMap[scopeId];}});}
function clearAll(){if(scrollTimer){clearTimeout(scrollTimer);scrollTimer=null;}
if(topicMapSyncTimer){clearTimeout(topicMapSyncTimer);topicMapSyncTimer=null;}
pendingTopicMapSeq=0;for(let index=1;index<=5;index+=1){clearRound(index);}
reset();}
return{handleMessage:handleProtocolMessage,reset,clearAll,hydrateFromDom,toggleReasoningPanel:renderer.toggleReasoningPanel};})();window.debateMessageHandler=debateMessageHandler;;const liuyaoJieguaAsync=(()=>{'use strict';const CONFIG={MAX_RECONNECT_ATTEMPTS:3,RECONNECT_DELAY:2000,TASK_TIMEOUT:3600000,HEARTBEAT_INTERVAL:30000};const STREAM_STATUS=liuyaoLocalStorage.STATUS;let websocket=null;let reconnectAttempts=0;let isProcessing=false;let heartbeatTimer=null;document.addEventListener('DOMContentLoaded',init);async function init(){liuyaoLocalStorage.initStorage();liuyaoUI.setBtnState('enable');liuyaoUI.resetResultActions();liuyaoUI.bindAgentPanelEvents();const jieguaBtn=document.getElementById('jiegua');if(jieguaBtn){jieguaBtn.addEventListener('click',jiegua);}}
async function jiegua(){if(isProcessing){await cancelCurrentTask();return;}
if(!await liuyaoFetch.isLogin()){messageModule.error({content:'请先登录后再进行解读。'});liuyaoUI.setBtnState('enable');return;}
liuyaoUI.setBtnState('loading');scrollToResult();if(!await validateLiuyaoForm()){liuyaoUI.setBtnState('enable');return;}
if(!await liuyaoFetch.confirmJieguaFee()){liuyaoUI.setBtnState('enable');return;}
isProcessing=true;resetContentStore();prepareNewTaskStorage();try{const data=await liuyaoFetch.submitTask();await handleSubmitResponse(data);}catch(error){console.error('提交任务失败:',error);handleTaskError('提交解读任务失败，请重试');}}
async function handleSubmitResponse(data){if(!data||!data.success){const hasExistingTaskId=data&&Object.prototype.hasOwnProperty.call(data,'existing_task_id');const existingTaskId=hasExistingTaskId?data['existing_task_id']:'';const errorMessage=data&&data['message']?data['message']:'提交解读任务失败，请重试';if(existingTaskId){messageModule.info({content:errorMessage||'正在恢复已有任务...'});await restoreExistingActiveTask(existingTaskId);reconnectAttempts=0;connectToWebSocket(existingTaskId);return;}
handleTaskError(errorMessage);return;}
if(!data['task_id']){handleTaskError('任务ID无效，请重试');return;}
liuyaoLocalStorage.setStorageData('taskId',data['task_id']);reconnectAttempts=0;connectToWebSocket(data['task_id']);}
async function restoreExistingActiveTask(taskId){try{const response=await liuyaoFetch.fetchLatestActiveTask('liuyao');const activeTask=response&&response.task;if(!activeTask||activeTask['task_id']!==taskId){throw new Error('未获取到匹配的活动任务');}
const payload=activeTask['request_payload']||{};liuyaoLocalStorage.batchUpdateStorageData({...payload,taskId:activeTask['task_id'],created_at:activeTask.created_at||payload.created_at||'',taskStartedAt:liuyaoUtils.normalizeIsoOrTimestamp(activeTask.created_at)||Date.now(),status:activeTask.status||STREAM_STATUS.PROCESSING,});const nextTaskData=liuyaoLocalStorage.getData();if(window.liuyaoRecover&&typeof window.liuyaoRecover.restoreTaskSnapshot==='function'){await window.liuyaoRecover.restoreTaskSnapshot(nextTaskData,{renderResult:true,syncButtons:false,});}
return;}catch(error){console.warn('恢复已有活动任务快照失败，回退为仅重连任务:',error);}
liuyaoLocalStorage.batchUpdateStorageData({taskId:taskId,taskStartedAt:Date.now(),status:STREAM_STATUS.PROCESSING,});}
function connectToWebSocket(taskId){if(!taskId){handleTaskError('任务ID无效，请刷新页面重试');return;}
isProcessing=true;closeWebSocket();const sseUrl=`/api/ai/tasks/${taskId}/stream`;websocket=new EventSource(sseUrl);websocket.onopen=function(){reconnectAttempts=0;liuyaoUI.updateTips('已链接智能体，正在等待解读...');};websocket.onmessage=async function(event){try{const data=JSON.parse(event.data);await handleTaskStreamMessage(data);}catch(error){console.warn('解析消息失败:',event.data,error);}};websocket.onerror=function(error){console.error('SSE 连接错误:',error);websocket.close();websocket=null;if(isProcessing){reconnectToTask(taskId);}};}
function reconnectToTask(taskId){if(reconnectAttempts>=CONFIG.MAX_RECONNECT_ATTEMPTS){handleTaskError('智能体连接失败，请刷新页面重试');return;}
reconnectAttempts+=1;liuyaoUI.updateTips(`智能体连接中断，正在重新链接(${reconnectAttempts}/${CONFIG.MAX_RECONNECT_ATTEMPTS})...`);setTimeout(()=>connectToWebSocket(taskId),CONFIG.RECONNECT_DELAY);}
function startHeartbeat(){}
function stopHeartbeat(){if(!heartbeatTimer){return;}
clearInterval(heartbeatTimer);heartbeatTimer=null;}
function closeWebSocket(){stopHeartbeat();if(!websocket){return;}
websocket.close();websocket=null;}
function resetRuntime(){closeWebSocket();reconnectAttempts=0;isProcessing=false;}
function normalizeTaskStatus(status){const statusMap={PENDING:STREAM_STATUS.PENDING,WAITING_RESOURCE:STREAM_STATUS.WAITING_RESOURCE,RUNNING:STREAM_STATUS.PROCESSING,SUCCESS:STREAM_STATUS.COMPLETED,FAILED:STREAM_STATUS.FAILED,CANCELLED:STREAM_STATUS.CANCELLED};return statusMap[status]||status;}
function getReconnectAfterSeq(){const afterSeq=Number(liuyaoLocalStorage.getKeyData('lastStreamSeq')||0);return Number.isFinite(afterSeq)&&afterSeq>0?afterSeq:0;}
function persistProcessedStreamSeq(seq){const nextSeq=Number(seq||0);if(!Number.isFinite(nextSeq)||nextSeq<=0){return;}
const currentSeq=Number(liuyaoLocalStorage.getKeyData('lastStreamSeq')||0);if(nextSeq<=currentSeq){return;}
liuyaoLocalStorage.setStorageData('lastStreamSeq',nextSeq);}
async function handleTaskStreamMessage(data){switch(data.type){case'connection_established':await syncTaskStatusOnReconnect();return;case'pong':case'base_info':return;case'init':if(data.content){liuyaoUI.updateTips(data.content);}
return;case'phase':if(data.message){liuyaoUI.updateTips(data.message);}
return;case'warning':case'heartbeat':if(data.content){liuyaoUI.updateTips(data.content);}
persistProcessedStreamSeq(data['seq']);return;case'status':await handleStatusMessage(data);return;case'reasoning':handleReasoningMessage(data.content);persistProcessedStreamSeq(data['seq']);return;case'token':case'answer':handleResultMessage(data.content);persistProcessedStreamSeq(data['seq']);return;case'debate_start':case'debate':case'debate_reasoning':case'judge_decision_stream':case'judge_decision_complete':case'judge_decision':case'judge_final_stream':case'judge_final_complete':case'round_complete':case'exchange_continue':case'consensus_reached':case'anchor_complete':case'analysis_complete':case'stage_transition':case'mcp_system':case'mcp_agent_output':case'mcp_agent_reasoning':if(typeof debateMessageHandler!=='undefined'){debateMessageHandler.handleMessage(data);}
return;case'done':await handleTaskComplete();return;case'error':handleTaskError(data.content||'智能体服务出现错误');return;default:console.warn('未知消息类型:',data.type,data.content);}}
function handleReasoningMessage(content){if(!content){return;}
liuyaoUI.updateTips('智能体正在深度解读，点击这里可查看详情...');streamRenderer.render('debate-round-0',content);liuyaoLocalStorage.updateStorageData('reasoningProcess',content);}
function handleResultMessage(content){if(!content){return;}
liuyaoUI.updateTips('正在整理智能体解读结果...');streamRenderer.render('result',content);liuyaoLocalStorage.updateStorageData('resultAnalysis',content);}
async function handleTaskComplete(){closeWebSocket();isProcessing=false;const taskData=liuyaoLocalStorage.getData();if(!taskData||!taskData.taskId){finalizeCompletedView();return;}
try{const status=await liuyaoFetch.fetchTaskStatus(taskData.taskId);await updateStorageFromCompletedStatus(status);}catch(error){console.warn('获取最终结果失败，继续使用当前流式内容:',error);}
finalizeCompletedView();}
async function syncTaskStatusOnReconnect(){const taskId=liuyaoLocalStorage.getKeyData('taskId');if(!taskId){return;}
try{const status=await liuyaoFetch.fetchTaskStatus(taskId);await handleStatusMessage(status);}catch(error){console.warn('重连后同步任务状态失败:',error);}}
async function handleStatusMessage(data){const rawStatus=data&&data['status']?data['status']:data&&data['content']?data['content']:'';if(!rawStatus){return;}
const normalizedStatus=normalizeTaskStatus(rawStatus);liuyaoLocalStorage.setStorageData('status',normalizedStatus);if(normalizedStatus===STREAM_STATUS.WAITING_RESOURCE){liuyaoUI.updateTips('当前智能体已满载，正在链接空闲智能体...');return;}
if(normalizedStatus===STREAM_STATUS.PROCESSING||normalizedStatus===STREAM_STATUS.PENDING){const progress=Number(data&&data['progress']?data['progress']:0);if(progress>0){liuyaoUI.updateTips(`智能体正在解读，当前进度 ${progress}%...`);}
return;}
if(normalizedStatus===STREAM_STATUS.COMPLETED){await updateStorageFromCompletedStatus(data);isProcessing=false;finalizeCompletedView();return;}
let statusMessage='';if(data){if(data['error_message']){statusMessage=data['error_message'];}else if(data['message']){statusMessage=data['message'];}else if(data['content']){statusMessage=data['content'];}}
if(normalizedStatus===STREAM_STATUS.CANCELLED){handleTaskCancelled(statusMessage||'任务已取消');return;}
if(normalizedStatus===STREAM_STATUS.FAILED){handleTaskError(statusMessage||'任务失败，请稍后重试');}}
async function updateStorageFromCompletedStatus(status){if(!status.success||status.status!==STREAM_STATUS.COMPLETED){return;}
const renderedTopicMap=captureRenderedTopicMap();const nextData={status:STREAM_STATUS.COMPLETED,tempCaseId:status.temp_case_id||liuyaoLocalStorage.getKeyData('tempCaseId')||'',resultAnalysis:status.result_analysis||liuyaoLocalStorage.getKeyData('resultAnalysis')||'',reasoningProcess:status.reasoning_process||liuyaoLocalStorage.getKeyData('reasoningProcess')||'',topicMap:liuyaoUtils.mergeTopicMaps(liuyaoUtils.mergeTopicMaps(status.topic_map||{},renderedTopicMap),liuyaoLocalStorage.getKeyData('topicMap')||{})};liuyaoLocalStorage.batchUpdateStorageData(nextData);if(nextData.resultAnalysis){streamRenderer.setContent('result',nextData.resultAnalysis);streamRenderer.flush('result');}
if(hasStructuredTopicMap(nextData.topicMap)){liuyaoUI.renderStructuredAgentPanel({topic_map:nextData.topicMap,reasoning_process:nextData.reasoningProcess||'',});}}
function finalizeCompletedView(){liuyaoUI.updateTips('智能体解读完成，结果仅供参考',false);liuyaoUI.showAppraisePanel();liuyaoUI.setBtnState('success');liuyaoUI.enableSaveAction();}
function handleTaskError(errorMsg){closeWebSocket();isProcessing=false;liuyaoLocalStorage.setStorageData('status',STREAM_STATUS.FAILED);messageModule.error({content:errorMsg||'智能体服务出现错误'});liuyaoUI.updateTips('处理过程中出现错误');liuyaoUI.setBtnState('enable');liuyaoUI.resetResultActions();}
function handleTaskCancelled(message){closeWebSocket();isProcessing=false;liuyaoLocalStorage.setStorageData('status',STREAM_STATUS.CANCELLED);messageModule.info({content:message||'任务已取消'});liuyaoUI.updateTips('任务已取消');liuyaoUI.setBtnState('enable');liuyaoUI.resetResultActions();}
async function cancelCurrentTask(){const taskId=liuyaoLocalStorage.getKeyData('taskId');if(!taskId){resetRuntime();liuyaoUI.setBtnState('enable');return;}
liuyaoUI.setBtnState('cancelling');try{const response=await liuyaoFetch.cancelTask(taskId);if(response&&response.success){handleTaskCancelled(response.message||'任务已取消');return;}
messageModule.warning({content:response?.message||'取消任务失败，请稍后重试'});if(isProcessing){liuyaoUI.setBtnState('loading');}}catch(error){console.error('取消任务失败:',error);messageModule.error({content:'取消任务失败，请稍后重试'});if(isProcessing){liuyaoUI.setBtnState('loading');}}}
function scrollToResult(){if(window.innerWidth>768){return;}
const result=document.getElementById('result');if(result){result.scrollIntoView({block:'start',behavior:'smooth'});}}
function resetContentStore(){streamRenderer.clear('result');streamRenderer.clear('debate-round-0');if(typeof debateMessageHandler!=='undefined'){debateMessageHandler.clearAll();return;}
for(let index=1;index<=5;index++){streamRenderer.clear(`debate-round-${index}`);}}
function prepareNewTaskStorage(){liuyaoLocalStorage.resetTaskRuntimeData();liuyaoLocalStorage.batchUpdateStorageData({status:STREAM_STATUS.PENDING,taskStartedAt:Date.now()});if(typeof liuyaoUI.resetAgentPanelAutoOpenState==='function'){liuyaoUI.resetAgentPanelAutoOpenState();}
liuyaoUI.resetResultActions();liuyaoUI.hideSharePanel();}
function hasStructuredTopicMap(topicMap){return!!topicMap&&Object.values(topicMap).some((item)=>item&&Object.keys(item).length>0);}
function captureRenderedTopicMap(){const agentPanel=document.getElementById('agent-panel');if(!agentPanel||!window.liuyaoCasePanel||typeof window.liuyaoCasePanel.captureTopicMap!=='function'){return{};}
return window.liuyaoCasePanel.captureTopicMap(agentPanel);}
function validateLiuyaoForm(){const fields={name:{element:document.getElementById('name'),error:'【请填写占问人】'},gender:{element:document.getElementById('gender'),error:'【请选择性别】'},question:{element:document.getElementById('question'),error:'【请填写占问事项】'},time:{element:document.getElementById('time'),error:'【请填写占卜时间】'},agent:{element:document.getElementById('agent'),error:'【请选择解读风格】'}};const errors=[];Object.values(fields).forEach(({element,error})=>{if(!element?.value?.trim()){errors.push(`<p>${error}</p>`);}});if(errors.length>0){messageModule.error({content:'<h3>以下信息需要完善：</h3><hr>'+errors.join(''),isHtml:true});return false;}
return confirmOptionalFields();}
function confirmOptionalFields(){const birthday=document.getElementById('birthday')?.value;const identity=document.getElementById('identity')?.value?.trim();let confirmContent='';if(!birthday){confirmContent+='<h3>未填写生日信息</h3><p>可能会影响部分解读准确性，请确认是否继续？</p><hr>';}
if(!identity){confirmContent+='<h3>未填写身份信息</h3><p>可能会影响部分解读准确性，请确认是否继续？</p><hr>';}
if(!confirmContent){return true;}
return messageModule.confirm({content:confirmContent,isHtml:true});}
return{connectToWebSocket,resetRuntime,};})();;const liuyaoSave=(()=>{'use strict';const DEFAULT_CASE_RATING=8.0;const saveBtn=document.getElementById('save');if(saveBtn){saveBtn.addEventListener('click',saveLiuYaoCase);}
async function saveLiuYaoCase(){liuyaoUI.setSaveLoading();let taskData=liuyaoLocalStorage.getData();if(!validateSaveData(taskData)){liuyaoUI.enableSaveAction();return;}
taskData=await syncLatestTaskResultBeforeSave(taskData);if(!validateSaveData(taskData)){liuyaoUI.enableSaveAction();return;}
const liuyaoCaseData=constructLiuyaoCase(taskData);if(!liuyaoCaseData){liuyaoUI.enableSaveAction();return;}
try{const data=await submitSaveLiuYaoCase(liuyaoCaseData);if(!data.success){messageModule.error({content:data.message||'保存失败'});liuyaoUI.enableSaveAction();return;}
liuyaoLocalStorage.batchUpdateStorageData({caseId:data.case_id,shareUrl:''});messageModule.toast({content:'保存成功'});liuyaoUI.markSaveCompleted();liuyaoUI.enableShareAction();liuyaoUI.enableFollowAction();}catch(error){messageModule.error({content:error.message||'保存失败，请稍后重试'});liuyaoUI.enableSaveAction();}}
function validateSaveData(taskData){if(!taskData){messageModule.error({content:'任务数据未找到，请重新解卦'});return false;}
if(taskData.status!==liuyaoLocalStorage.STATUS.COMPLETED){messageModule.error({content:'当前解读尚未完成，请等待结果生成后再保存。'});return false;}
if(!String(taskData.resultAnalysis||'').trim()){messageModule.error({content:'请先进行解卦后再保存。'});return false;}
return true;}
async function syncLatestTaskResultBeforeSave(taskData){const taskId=taskData&&taskData.taskId;if(!taskId){return taskData;}
try{const latestStatus=await liuyaoFetch.fetchTaskStatus(taskId);if(!latestStatus.success||latestStatus.status!==liuyaoLocalStorage.STATUS.COMPLETED){return taskData;}
const renderedTopicMap=captureRenderedTopicMap();const mergedTaskData={...taskData,status:liuyaoLocalStorage.STATUS.COMPLETED,resultAnalysis:latestStatus.result_analysis||taskData.resultAnalysis||'',reasoningProcess:latestStatus.reasoning_process||taskData.reasoningProcess||'',tempCaseId:latestStatus.temp_case_id||taskData.tempCaseId||'',topicMap:liuyaoUtils.mergeTopicMaps(liuyaoUtils.mergeTopicMaps(latestStatus.topic_map||{},renderedTopicMap),taskData.topicMap||{})};liuyaoLocalStorage.batchUpdateStorageData({status:mergedTaskData.status,resultAnalysis:mergedTaskData.resultAnalysis,reasoningProcess:mergedTaskData.reasoningProcess,tempCaseId:mergedTaskData.tempCaseId,topicMap:mergedTaskData.topicMap,});refreshResultDisplay(mergedTaskData);return mergedTaskData;}catch(error){console.warn('保存前同步最新任务结果失败，继续使用本地结果:',error);return taskData;}}
function captureRenderedTopicMap(){const agentPanel=document.getElementById('agent-panel');if(!agentPanel||!window.liuyaoCasePanel||typeof window.liuyaoCasePanel.captureTopicMap!=='function'){return{};}
return window.liuyaoCasePanel.captureTopicMap(agentPanel);}
function refreshResultDisplay(taskData){if(typeof streamRenderer!=='undefined'&&taskData.resultAnalysis){streamRenderer.setContent('result',taskData.resultAnalysis);if(typeof streamRenderer.flush==='function'){streamRenderer.flush('result');}}}
function constructLiuyaoCase(taskData){const payload=typeof liuyaoFetch!=='undefined'&&typeof liuyaoFetch.buildSubmitPayload==='function'?liuyaoFetch.buildSubmitPayload():{};const mergedTaskData={...taskData,...payload,};return{question:mergedTaskData.question||'',querent:mergedTaskData.name||'',created_at:mergedTaskData.created_at||new Date().toISOString(),time:mergedTaskData.time||'',reasoning_process:mergedTaskData.reasoningProcess||'',result_analysis:mergedTaskData.resultAnalysis||'',base_guaxiang:mergedTaskData.baseGuaxiang||'',markdown_guaxiang:mergedTaskData.markdownGuaxiang||'',topic_map:mergedTaskData.topicMap||{},rating:getRating(),is_public:getIsPublic(),temp_case_id:mergedTaskData.tempCaseId||''};}
function getRating(){const ratingElement=document.getElementById('appraise-rating-input');const rawValue=ratingElement?(ratingElement.value||ratingElement.getAttribute('value')||''):'';const parsedValue=parseFloat(rawValue);if(Number.isFinite(parsedValue)&&parsedValue>=1){return parsedValue;}
return DEFAULT_CASE_RATING;}
function getIsPublic(){const isOpenElement=document.getElementById('case-is-open');return isOpenElement?liuyaoUtils.toBoolean(isOpenElement.getAttribute('data-open')):false;}
async function submitSaveLiuYaoCase(liuyaoCaseData){return liuyaoUtils.requestJson('/liuyao/cases/save/',{method:'POST',headers:{'Content-Type':'application/json','X-CSRFToken':liuyaoUtils.getCookie('csrftoken')},body:JSON.stringify(liuyaoCaseData),credentials:'same-origin'});}
return{};})();;(()=>{'use strict';const shareBtn=document.getElementById('share');if(shareBtn){shareBtn.addEventListener('click',startShare);}
async function startShare(){const sharedUrl=liuyaoLocalStorage.getKeyData('shareUrl');if(sharedUrl){liuyaoUI.showSharePanel(sharedUrl);await copyToClipboard(sharedUrl);liuyaoUI.enableShareAction('复制链接');return;}
liuyaoUI.setShareLoading();try{const data=await submitShare();if(!data.success){messageModule.error({content:data.message||'分享失败'});liuyaoUI.enableShareAction();return;}
const shareUrl=data.share_url||'';liuyaoLocalStorage.setStorageData('shareUrl',shareUrl);liuyaoUI.showSharePanel(shareUrl);await copyToClipboard(shareUrl);liuyaoUI.enableShareAction('复制链接');}catch(error){messageModule.error({content:error.message||'分享失败，请稍后重试'});liuyaoUI.enableShareAction();}}
async function submitShare(){const caseId=liuyaoLocalStorage.getKeyData('caseId');if(!caseId){return{success:false,message:'请先保存六爻卦例'};}
return liuyaoUtils.requestJson('/liuyao/api/share_case/',{method:'POST',headers:{'Content-Type':'application/json','X-CSRFToken':liuyaoUtils.getCookie('csrftoken')},body:JSON.stringify({case_id:caseId}),credentials:'same-origin'});}
async function copyToClipboard(text){if(!text){return;}
if(navigator.clipboard){try{await navigator.clipboard.writeText(text);messageModule.toast({content:'分享链接已复制到剪贴板'});return;}catch(error){messageModule.warning({content:'系统复制失败，正在尝试兼容方案'});}}
copyToClipboardFallback(text);}
function copyToClipboardFallback(text){const textarea=document.createElement('textarea');textarea.value=text;textarea.style.position='fixed';textarea.style.opacity='0';document.body.appendChild(textarea);textarea.focus();textarea.select();try{const successful=document.execCommand('copy');if(successful){messageModule.toast({content:'分享链接已复制到剪贴板'});}else{messageModule.error({content:'自动复制失败，请手动复制分享链接'});}}catch(error){messageModule.error({content:'自动复制失败，请手动复制分享链接'});}
document.body.removeChild(textarea);}})();;(()=>{'use strict';document.addEventListener('DOMContentLoaded',init);function init(){const followBtn=document.getElementById('follow');if(!followBtn){return;}
followBtn.addEventListener('click',handleFollowClick);}
function handleFollowClick(){const followBtn=document.getElementById('follow');if(!followBtn||followBtn.classList.contains('disabled')){return;}
const taskData=liuyaoLocalStorage.getData()||{};const hasResult=taskData.status===liuyaoLocalStorage.STATUS.COMPLETED&&Boolean(String(taskData.resultAnalysis||'').trim());if(!hasResult){return;}
openFollowDialog(taskData,'你是一位精通六爻占卜的解卦大师。用户之前已经得到了一次完整的六爻解读，现在用户有追问。请基于之前的卦象和解读，回答用户的追问。');}
function openFollowDialog(taskData,systemPromptBase){closeFollowDialog();const overlay=document.createElement('div');overlay.id='follow-overlay';overlay.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:99999;display:flex;align-items:center;justify-content:center;padding:16px;';const panel=document.createElement('div');panel.id='follow-panel';panel.style.cssText='border-radius:10px;width:100%;max-width:680px;max-height:85vh;display:flex;flex-direction:column;overflow:hidden;box-shadow:0 8px 32px 0 rgba(0,0,0,0.37);backdrop-filter:blur(10px) saturate(180%);-webkit-backdrop-filter:blur(10px) saturate(180%);background:rgba(var(--bg-rgb-2),0.92);color:var(--text-color-1);border:1px solid var(--border-color-1);';const header=document.createElement('div');header.style.cssText='display:flex;justify-content:space-between;align-items:center;padding:14px 20px;border-bottom:1px solid var(--border-color-1);';const title=document.createElement('span');title.textContent='追问解读';title.style.cssText='font-size:15px;font-weight:600;color:var(--text-color-1);';header.appendChild(title);const closeBtn=document.createElement('button');closeBtn.textContent='✕';closeBtn.style.cssText='background:none;border:1px solid var(--border-color-1);border-radius:10px;font-size:14px;cursor:pointer;color:var(--text-color-1);padding:4px 10px;transition:color .3s,border-color .3s;';closeBtn.onmouseenter=function(){this.style.color='var(--primary-color)';this.style.borderColor='var(--primary-color)';};closeBtn.onmouseleave=function(){this.style.color='var(--text-color-1)';this.style.borderColor='var(--border-color-1)';};closeBtn.onclick=closeFollowDialog;header.appendChild(closeBtn);panel.appendChild(header);const body=document.createElement('div');body.style.cssText='flex:1;overflow-y:auto;padding:16px 20px;display:flex;flex-direction:column;gap:12px;scrollbar-width:thin;';const resultLabel=document.createElement('div');resultLabel.style.cssText='font-size:12px;color:var(--text-color-disabled);margin-bottom:2px;';resultLabel.textContent='原始解读';body.appendChild(resultLabel);const resultBox=document.createElement('div');resultBox.style.cssText='border-radius:5px;border:1px solid var(--border-color-1);padding:12px;font-size:13px;line-height:1.7;max-height:180px;overflow-y:auto;white-space:pre-wrap;color:var(--text-color-1);background:rgba(var(--bg-rgb-1),0.03);scrollbar-width:thin;';resultBox.textContent=taskData.resultAnalysis||'暂无';body.appendChild(resultBox);const answerBox=document.createElement('div');answerBox.id='follow-answer';answerBox.style.cssText='display:none;border-radius:5px;border:1px solid var(--border-color-1);padding:12px;font-size:14px;line-height:1.8;white-space:pre-wrap;max-height:260px;overflow-y:auto;color:var(--text-color-1);background:rgba(var(--bg-rgb-1),0.03);scrollbar-width:thin;';body.appendChild(answerBox);panel.appendChild(body);const footer=document.createElement('div');footer.style.cssText='padding:12px 20px;border-top:1px solid var(--border-color-1);display:flex;gap:8px;align-items:flex-end;';const textarea=document.createElement('textarea');textarea.id='follow-input';textarea.placeholder='输入追问内容...';textarea.style.cssText='flex:1;min-height:44px;max-height:100px;padding:10px 12px;border:1px solid var(--border-color-1);border-radius:10px;font-size:14px;resize:none;outline:none;font-family:inherit;color:var(--text-color-1);background:transparent;transition:border-color .3s;';textarea.addEventListener('focus',function(){this.style.borderColor='var(--primary-color)';});textarea.addEventListener('blur',function(){this.style.borderColor='var(--border-color-1)';});textarea.addEventListener('keydown',function(e){if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();sendFollowUp(taskData,systemPromptBase);}});const sendBtn=document.createElement('button');sendBtn.id='follow-send';sendBtn.textContent='发送';sendBtn.style.cssText='padding:10px 20px;border:1px solid var(--border-color-1);border-radius:10px;font-size:14px;cursor:pointer;white-space:nowrap;color:var(--text-color-1);background:transparent;transition:color .3s,border-color .3s,background-color .3s;';sendBtn.onmouseenter=function(){this.style.color='var(--primary-color)';this.style.borderColor='var(--primary-color)';};sendBtn.onmouseleave=function(){this.style.color='var(--text-color-1)';this.style.borderColor='var(--border-color-1)';};sendBtn.onclick=function(){sendFollowUp(taskData,systemPromptBase);};footer.appendChild(textarea);footer.appendChild(sendBtn);panel.appendChild(footer);overlay.appendChild(panel);overlay.addEventListener('click',function(e){if(e.target===overlay)closeFollowDialog();});document.body.appendChild(overlay);textarea.focus();}
function closeFollowDialog(){const overlay=document.getElementById('follow-overlay');if(overlay)overlay.remove();}
function sendFollowUp(taskData,systemPromptBase){const input=document.getElementById('follow-input');const answerBox=document.getElementById('follow-answer');const sendBtn=document.getElementById('follow-send');if(!input||!answerBox||!sendBtn)return;const question=input.value.trim();if(!question)return;sendBtn.disabled=true;sendBtn.textContent='思考中...';sendBtn.style.opacity='0.5';sendBtn.style.cursor='not-allowed';input.disabled=true;answerBox.style.display='block';answerBox.textContent='';const systemPrompt=systemPromptBase+'\n\n之前的基础卦象信息：\n'+(typeof taskData.baseGuaxiang==='string'?taskData.baseGuaxiang:JSON.stringify(taskData.baseGuaxiang||{}))+'\n\n之前的解读结果：\n'+(taskData.resultAnalysis||'无')+'\n\n请用中文回答，保持专业但易懂。';fetch('/api/ai/follow-up',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({system_prompt:systemPrompt,user_message:question})}).then(function(response){if(!response.ok)throw new Error('请求失败');const reader=response.body.getReader();const decoder=new TextDecoder();let fullText='';function readChunk(){reader.read().then(function(result){if(result.done){sendBtn.disabled=false;sendBtn.textContent='发送';sendBtn.style.opacity='';sendBtn.style.cursor='';input.disabled=false;input.value='';return;}
const chunk=decoder.decode(result.value,{stream:true});const lines=chunk.split('\n');for(let i=0;i<lines.length;i++){if(lines[i].startsWith('data: ')){try{const data=JSON.parse(lines[i].slice(6));if(data.content){fullText+=data.content;answerBox.textContent=fullText;answerBox.scrollTop=answerBox.scrollHeight;}}catch(e){}}}
readChunk();}).catch(function(){sendBtn.disabled=false;sendBtn.textContent='发送';sendBtn.style.opacity='';sendBtn.style.cursor='';input.disabled=false;});}
readChunk();}).catch(function(){answerBox.textContent='请求失败，请重试';sendBtn.disabled=false;sendBtn.textContent='发送';sendBtn.style.opacity='';sendBtn.style.cursor='';input.disabled=false;});}})();;(()=>{'use strict';document.addEventListener('DOMContentLoaded',init);let lastGuaName=null;let yijingIframe=null;let isYijingReady=false;function init(){yijingIframe=document.getElementById('yijing');if(!yijingIframe){return;}
yijingIframe.addEventListener('load',()=>{});window.addEventListener('message',handleIframeMessage);setupBenguaObserver();}
function setupBenguaObserver(){const benguaGuaming=document.getElementById('bengua-guaming');if(!benguaGuaming){return;}
const observer=new MutationObserver((mutations)=>{mutations.forEach((mutation)=>{if(mutation.type==='childList'||mutation.type==='characterData'){const currentText=benguaGuaming.textContent.trim();if(currentText&&currentText!==lastGuaName){lastGuaName=currentText;const guaName=extractGuaName(currentText);if(guaName){setTimeout(()=>{sendGuaNameToIframe(guaName);},3000)}}}});});const config={childList:true,characterData:true,subtree:true,attributes:false};observer.observe(benguaGuaming,config);}
function extractGuaName(text){let cleaned=text.replace(/[䷀-䷿]/g,'').replace(/卦/g,'').trim();if(cleaned.endsWith('卦')){cleaned=cleaned.slice(0,-1);}
return cleaned;}
function handleIframeMessage(event){if(event.origin!==window.location.origin){return;}
if(event.data&&event.data.type==='YIJING_READY'){isYijingReady=true;if(lastGuaName){const guaName=extractGuaName(lastGuaName);sendGuaNameToIframe(guaName);}}}
function sendGuaNameToIframe(guaName){if(!yijingIframe||!yijingIframe.contentWindow){console.error('Cannot access yijing iframe content window');return;}
try{yijingIframe.contentWindow.postMessage({type:'BENGUA_UPDATE',guaName:guaName},window.location.origin);}catch(error){console.error('Error sending message to iframe:',error);}}})();;(()=>{'use strict';const CONFIG={TASK_TIMEOUT:1800000,};document.addEventListener('DOMContentLoaded',()=>{document.addEventListener('infoInputModuleReady',init,{once:true});});async function init(){const tempId=getTempIdFromUrl();if(tempId){await restoreFromTempCase(tempId);return;}
await restorePendingTaskIfNeeded();await restoreServerActiveTaskIfNeeded();}
function getTempIdFromUrl(){return new URLSearchParams(window.location.search).get('temp_id');}
async function restoreFromTempCase(tempId){try{const data=await liuyaoUtils.requestJson('/liuyao/api/temp_case/show/',{method:'POST',headers:{'X-Requested-With':'XMLHttpRequest','X-CSRFToken':liuyaoUtils.getCookie('csrftoken'),'Content-Type':'application/json'},body:JSON.stringify({temp_id:tempId}),credentials:'same-origin'});if(!data.success||!data.case){messageModule.error({content:data.message||'获取缓存卦例失败'});return;}
const caseData=data.case;const normalizedCaseData=buildTaskDataFromTempCase(caseData);liuyaoLocalStorage.replaceStorage(normalizedCaseData);await restoreTaskSnapshot(normalizedCaseData,{renderResult:true,syncButtons:true,});}catch(error){console.error('从缓存卦例恢复失败:',error);messageModule.error({content:'恢复失败，请稍后重试'});}}
function buildTaskDataFromTempCase(caseData){return{...liuyaoLocalStorage.DEFAULT_DATA,tempCaseId:caseData.id||'',status:caseData.result_analysis?liuyaoLocalStorage.STATUS.COMPLETED:liuyaoLocalStorage.STATUS.NONE,resultAnalysis:caseData.result_analysis||'',reasoningProcess:caseData.reasoning_process||'',topicMap:caseData.topic_map||{},baseGuaxiang:caseData.base_guaxiang||'',question:extractQuestionFromBaseGuaxiang(caseData.base_guaxiang),agent:caseData.ai_agent||liuyaoLocalStorage.DEFAULT_DATA.agent,category:caseData.ai_category||liuyaoLocalStorage.DEFAULT_DATA.category,};}
function extractQuestionFromBaseGuaxiang(baseGuaxiang){const parsed=parseBaseGuaxiang(baseGuaxiang);return parsed?parsed['占问问题']||'':'';}
async function restorePendingTaskIfNeeded(){const taskData=liuyaoLocalStorage.getData();if(!shouldTryRestoreTask(taskData)){return;}
if(isTaskExpired(taskData)){liuyaoLocalStorage.resetStorage();return;}
if(!taskData.taskId){liuyaoLocalStorage.resetStorage();return;}
if(!await liuyaoFetch.isLogin()){liuyaoLocalStorage.resetStorage();return;}
try{const serverStatus=await liuyaoFetch.fetchTaskStatus(taskData.taskId);await restoreTaskSnapshot(taskData,{renderResult:true,syncButtons:false,});if(serverStatus.status===liuyaoLocalStorage.STATUS.COMPLETED){await restoreCompletedTask(serverStatus,taskData);return;}
if(isTaskInProgress(serverStatus.status)){await confirmAndReconnectTask(taskData.taskId);return;}
liuyaoLocalStorage.resetStorage();}catch(error){console.warn('任务恢复失败，已清理本地缓存:',error);liuyaoLocalStorage.resetStorage();}}
function shouldTryRestoreTask(taskData){return!!taskData&&taskData.status!==liuyaoLocalStorage.STATUS.NONE;}
function isTaskExpired(taskData){const taskStartedAt=liuyaoUtils.normalizeIsoOrTimestamp(taskData.taskStartedAt||taskData.created_at);return!!taskStartedAt&&Date.now()-taskStartedAt>CONFIG.TASK_TIMEOUT;}
function isTaskInProgress(status){return status===liuyaoLocalStorage.STATUS.PENDING||status===liuyaoLocalStorage.STATUS.WAITING_RESOURCE||status===liuyaoLocalStorage.STATUS.PROCESSING;}
function captureRenderedTopicMap(){const agentPanel=document.getElementById('agent-panel');if(!agentPanel||!window.liuyaoCasePanel||typeof window.liuyaoCasePanel.captureTopicMap!=='function'){return{};}
return window.liuyaoCasePanel.captureTopicMap(agentPanel);}
async function confirmAndReconnectTask(taskId){isProcessing=true;liuyaoUI.setBtnState('loading');liuyaoUI.updateTips('正在恢复任务...');liuyaoJieguaAsync.connectToWebSocket(taskId);}
async function restoreServerActiveTaskIfNeeded(){const taskData=liuyaoLocalStorage.getData();if(taskData&&taskData.taskId&&isTaskInProgress(taskData.status)){return;}
if(!await liuyaoFetch.isLogin()){return;}
try{const response=await liuyaoFetch.fetchLatestActiveTask('liuyao');const activeTask=response&&response.task;if(!activeTask||!activeTask.task_id){return;}
const payload=activeTask.request_payload||{};liuyaoLocalStorage.batchUpdateStorageData({...payload,taskId:activeTask.task_id,created_at:activeTask.created_at||payload.created_at||'',taskStartedAt:liuyaoUtils.normalizeIsoOrTimestamp(activeTask.created_at)||Date.now(),status:activeTask.status||liuyaoLocalStorage.STATUS.PROCESSING,});const nextTaskData=liuyaoLocalStorage.getData();await restoreTaskSnapshot(nextTaskData,{renderResult:true,syncButtons:false,});await confirmAndReconnectTask(activeTask.task_id);}catch(error){console.warn('从服务端恢复活动任务失败:',error);}}
async function restoreCompletedTask(serverStatus,localTaskData){const renderedTopicMap=captureRenderedTopicMap();const mergedTaskData={...localTaskData,status:liuyaoLocalStorage.STATUS.COMPLETED,resultAnalysis:serverStatus.result_analysis||localTaskData.resultAnalysis||'',reasoningProcess:serverStatus.reasoning_process||localTaskData.reasoningProcess||'',topicMap:liuyaoUtils.mergeTopicMaps(liuyaoUtils.mergeTopicMaps(serverStatus.topic_map||{},renderedTopicMap),localTaskData.topicMap||{}),tempCaseId:serverStatus.temp_case_id||localTaskData.tempCaseId||''};liuyaoLocalStorage.replaceStorage({...liuyaoLocalStorage.DEFAULT_DATA,...mergedTaskData});await restoreTaskSnapshot(mergedTaskData,{renderResult:true,syncButtons:true,});}
async function restoreTaskSnapshot(taskData,options={}){await restoreFormAndPaipan(taskData);renderTaskSnapshot(taskData,options);}
async function restoreFormAndPaipan(taskData){if(taskData.baseGuaxiang){await restoreFromBaseGuaxiang(taskData.baseGuaxiang,taskData.agent,taskData.category);return;}
await restoreFromLegacyTaskData(taskData);}
async function restoreFromBaseGuaxiang(baseGuaxiang,agent=null,category=null){const guaxiang=parseBaseGuaxiang(baseGuaxiang);if(!guaxiang){return;}
try{if(typeof liuyao!=='undefined'&&liuyao.setRestoring){liuyao.setRestoring(true);}
restoreFormFieldsFromGuaxiang(guaxiang);restoreAgentFields(agent,category);if(Array.isArray(guaxiang['卦码'])){liuyao.restoreSymbolsState(guaxiang['卦码']);}
await liuyao.restorePaipan();}finally{if(typeof liuyao!=='undefined'&&liuyao.setRestoring){liuyao.setRestoring(false);}}}
function parseBaseGuaxiang(baseGuaxiang){if(!baseGuaxiang){return null;}
if(typeof baseGuaxiang==='object'){return baseGuaxiang;}
try{return JSON.parse(baseGuaxiang);}catch(error){try{return JSON.parse(String(baseGuaxiang).replace(/'/g,'"').replace(/None/g,'null').replace(/True/g,'true').replace(/False/g,'false'));}catch(secondError){console.error('解析 baseGuaxiang 失败:',error,secondError);return null;}}}
function restoreFormFieldsFromGuaxiang(guaxiang){const formFieldMap={name:guaxiang['姓名'],gender:guaxiang['性别'],birthday:guaxiang['生日']||'',identity:guaxiang['身份'],question:guaxiang['占问问题'],time:guaxiang['起卦时间']};Object.entries(formFieldMap).forEach(([id,value])=>{if(value===undefined||value===''){return;}
const element=document.getElementById(id);if(!element){return;}
element.value=value;element.setAttribute('value',value);});}
function restoreAgentFields(agent,category){const agentElement=document.getElementById('agent');if(!agentElement){return;}
if(agent){agentElement.value=agent;}
if(category){agentElement.setAttribute('data-category',category);}}
async function restoreFromLegacyTaskData(taskData){const fieldMap={name:taskData.name,gender:taskData.gender,birthday:taskData.birthday,identity:taskData.identity,question:taskData.question,time:taskData.time,agent:taskData.agent};Object.entries(fieldMap).forEach(([id,value])=>{if(value===undefined){return;}
const element=document.getElementById(id);if(!element){return;}
element.value=value;element.setAttribute('value',value);});restoreAgentFields(taskData.agent,taskData.category);if(taskData.params&&Array.isArray(taskData.params)){liuyao.restoreSymbolsState(taskData.params);await liuyao.restorePaipan();}}
function renderTaskSnapshot(taskData,options={}){const{renderResult=true,syncButtons=true}=options;streamRenderer.clear('debate-round-0');if(renderResult){streamRenderer.clear('result');}
if(renderResult&&taskData.resultAnalysis){streamRenderer.setContent('result',taskData.resultAnalysis);}
if(hasStructuredTopicMap(taskData.topicMap)){liuyaoUI.renderStructuredAgentPanel({topic_map:taskData.topicMap,reasoning_process:taskData.reasoningProcess||'',});}else if(taskData.reasoningProcess){liuyaoUI.resetAgentPanel();streamRenderer.setContent('debate-round-0',taskData.reasoningProcess);}else{liuyaoUI.resetAgentPanel();}
if(syncButtons){syncActionButtons(taskData);}}
function syncActionButtons(taskData){if(taskData.status===liuyaoLocalStorage.STATUS.COMPLETED&&taskData.resultAnalysis){liuyaoUI.setBtnState('success');liuyaoUI.showAppraisePanel();liuyaoUI.updateTips('智能体解读完成，结果仅供参考',false);liuyaoUI.enableSaveAction();}else{liuyaoUI.setBtnState('enable');liuyaoUI.resetResultActions();}
if(taskData.caseId){liuyaoUI.markSaveCompleted();liuyaoUI.enableShareAction(taskData.shareUrl?'复制链接':'分享');liuyaoUI.enableFollowAction();}
if(taskData.shareUrl){liuyaoUI.showSharePanel(taskData.shareUrl);}else{liuyaoUI.hideSharePanel();}}
function hasStructuredTopicMap(topicMap){return!!topicMap&&Object.values(topicMap).some((item)=>item&&Object.keys(item).length>0);}
window.liuyaoRecover={restoreTaskSnapshot,};})();;