class Dashboard {
  static async fetchAnnouncement() {
    return new Promise( ( resolve, reject ) => {
      // TODO: Call API

      resolve( [
        { date: 'Jun 9, 2020', data: 'Certificate will be email to qualifying participants by Friday July, 2020' },
        { date: 'Oct 5, 2020', data: 'Certificate will be email to qualifying participants by Friday Oct, 2020' },
      ] )
    } )
  }
}

export default Dashboard
