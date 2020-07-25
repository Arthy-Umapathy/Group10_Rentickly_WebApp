import mysql.connector as mysql 

class Model: 
    def __init__(self):
        
        self.hostname = "database-2.cigxoyp3dem3.us-east-1.rds.amazonaws.com"
        self.username = "admin"
        self.password = "rentickly"
        self.dbName = "rentickly"

        self.dbConnection = mysql.connect(
            host = self.hostname,
            user = self.username,
            passwd = self.dbName,
            database = self.dbName
        )

    def getUserId(self, email):
        dbCursor = self.dbConnection.cursor() 
        query = f"select userId from Users where email= '{email}'" 
        dbCursor.execute(query)
        records = dbCursor.fetchone() 
        self.dbConnection.close()
        return records[0]

    
    def getUsers(self):
        dbCursor = self.dbConnection.cursor() 
        query = "select * from Users"
        dbCursor.execute(query)

        records = dbCursor.fetchall() 
        return records 

    def postAdvertisement(self, adObject):
        dbCursor = self.dbConnection.cursor() 
        
        email = adObject['email']
        email_query = f"select userId from Users where email= '{email}'" 
        dbCursor.execute(email_query)
        email_record = dbCursor.fetchone() 
        adObject['userId'] = email_record[0]

        query = "INSERT INTO advertisements (adTitle, propertyType, \
                propertyAddress, zipCode, rentAmount, \
                propertyDescription, petFriendly, userId, applicationStatus, leaseType, \
                propertyLocation, contactTiming ) \
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)" 

        values = (  adObject['adTitle'], adObject['propertyType'], adObject['streetAddress'] ,
                    adObject['propertyZipCode'], adObject['rentAmount'], adObject['propertyDescription'], 
                    adObject['petFriendly'], adObject['userId'], adObject['applicationStatus'],
                    adObject['leaseType'], adObject['propertyLocation'], adObject['contactTiming']
                )
        
        dbCursor.execute(query, values)

        self.dbConnection.commit() 
        self.dbConnection.close() 

    
    def getAdvertisements(self, email):
        dbCursor = self.dbConnection.cursor() 
        
        email_query = f"select userId from Users where email= '{email}'" 
        dbCursor.execute(email_query)
        email_record = dbCursor.fetchone() 
        userId = email_record[0]

        query = f"select aId, adTitle, userId, propertyType, propertyAddress, zipCode, propertyDescription, \
                petFriendly, leaseType, propertyLocation, contactTiming, applicationStatus  \
                from advertisements where userId='{userId}'" 
        dbCursor.execute(query)
        records = dbCursor.fetchall() 

        self.dbConnection.commit() 
        self.dbConnection.close()     
        return records     

    def ViewReview(self, aid):
        dbCursor = self.dbConnection.cursor() 
        query = f"select * from Review where aId = '{aid}'"
        dbCursor.execute(query) 
        records = dbCursor.fetchall() 
        
        self.dbConnection.close()  
        return records 

    def getAllAdvertisement(self):
        dbCursor = self.dbConnection.cursor() 
        query = f"select aId, adTitle, propertyAddress, propertyDescription, rentAmount from advertisements" 
        dbCursor.execute(query)
        records = dbCursor.fetchall() 
        self.dbConnection.commit() 
        self.dbConnection.close()  
        print(records)   
        return records     





    
