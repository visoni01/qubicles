export function notificationEmailTemplate (EMAIL_TEMPLATE_GREETING, EMAIL_TEMPLATE_BODY, EMAIL_TEMPLATE_CLOSING) {

  const template = `
  <html>
  <head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  </head>
  <body>
  <table style="background-color: #f3f4f4;" cellspacing="0" cellpadding="0" width="100%" align="center" bgcolor="#F3F4F4">
    <tbody>
      <tr>
        <td><br />
        <table style="background-color: #d9dadb;" cellspacing="0" cellpadding="1" align="center" bgcolor="#D9DADB">
          <tbody>
            <tr>
              <td>
              <table style="font-family: arial, helvetica, sans-serif; font-size: 14px; line-height: 20px; background-color: #ffffff; font-color: black;" cellspacing="0" cellpadding="0" width="600" align="center" bgcolor="#ffffff">
                <tbody>
                  <tr>
                    <td width="30"><img style="display: block;" src="https://www.fenero.io/wp-content/uploads/2013/07/blank.gif" border="0" alt="" width="1" height="1" /></td>
                    <td style="font-family: arial, helvetica, sans-serif; font-size: 14px; line-height: 20px;">
                      <table border="0">
                          <tr style="margin-top:25px;">
                              <td>
                                  <a href="https://www.fenero.io?utm_source=welcome-email-logo-click"><img src="https://qubicles.io/assets/img/logos/qbe-dark.png" style="width:200px;margin-left:-10px;" alt="Qubicles" /></a> 
                              </td>
                              <td>
                                  <table border="0" cellpadding="0" cellspacing="0">
                                    <tbody>
                                    <tr>
                                      <td><a href="https://www.fenero.io/twitter?utm_source=welcome-email-twitter-click"><img alt="Twitter" style="display: block" src="https://www.fenero.io/wp-content/uploads/2013/07/twitter.gif" border="0" height="27" width="27"></a></td>
                                      <td><img style="display: block" src="https://www.fenero.io/wp-content/uploads/2013/07/spacer.gif" height="28" width="10"></td>
                                      <td><a href="https://www.fenero.io/facebook?utm_source=welcome-email-fb-click"><img alt="Facebook" style="display: block" src="https://www.fenero.io/wp-content/uploads/2013/07/facebook.gif" border="0" height="28" width="28"></a></td>
                                      <td><img style="display: block" src="https://www.fenero.io/wp-content/uploads/2013/07/spacer.gif" height="28" width="9"></td>
                                      <td><a href="https://www.fenero.io/linkedin?utm_source=welcome-email-linkedin-click"><img alt="LinkedIn" style="display: block" src="https://www.fenero.io/wp-content/uploads/2013/07/linkedin.gif" border="0" height="28" width="28"></a></td>
                                      <td><img style="display: block" src="https://www.fenero.io/wp-content/uploads/2013/07/spacer.gif" height="28" width="10"></td>
                                    </tr>
                                    </tbody>
                                  </table>
                              </td>
                          </tr>
                          <tr>
                              <td colspan="2">
                                  <p>
                                      <hr /><br />
                                        ${EMAIL_TEMPLATE_GREETING}, <br /><br />
                                        ${EMAIL_TEMPLATE_BODY}<br /><br />
                                        ${EMAIL_TEMPLATE_CLOSING}<br /><br />
                                        Sincerely,
                                    </p>
                                    <p>
                                      The Qubicles Team<br /><br />
                                    </p>
                              </td>
                          </tr>
                      </table>
                    </td>
                    <td width="30"><img style="display: block;" src="https://www.fenero.io/wp-content/uploads/2013/07/blank.gif" border="0" alt="" width="1" height="1" /></td>
                  </tr>
                  <tr>
                    <td width="30"><img style="display: block;" src="https://www.fenero.io/wp-content/uploads/2013/07/blank.gif" border="0" alt="" width="1" height="1" /></td>
                    <td align="right"><hr size="1px" /></td>
                    <td width="30"><img style="display: block;" src="https://www.fenero.io/wp-content/uploads/2013/07/blank.gif" border="0" alt="" width="1" height="1" /></td>
                  </tr>
                  <tr>
                    <td width="30"><img style="display: block;" src="https://www.fenero.io/wp-content/uploads/2013/07/blank.gif" border="0" alt="" width="1" height="1" /></td>
                    <td align="left">
                        <p style="font-size: 9px; color: #999; line-height: 12px; margin-top: 0px; text-align: center; font-family: Arial, Helvetica, sans-serif;" align="center"><br />
                        Qubicles and Fenero are registered trademarks of Qubicles, Inc. This message was produced and distributed by Qubicles, Inc., 400 W. Peachtree Street NW Ste #4-1150, Atlanta, GA 30308
                        </p>
                        <br />
                    </td>
                    <td width="30">
                      <img style="display: block;" src="https://www.fenero.io/wp-content/uploads/2013/07/blank.gif" border="0" alt="" width="1" height="1" />
                    </td>
                  </tr>
                </tbody>
              </table>
              </td>
            </tr>
          </tbody>
        </table>
        <br />
        </td>
      </tr>
    </tbody>
  </table>
  </body>
  </html>
  `
  return template
}
